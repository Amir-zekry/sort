'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import z from "zod";
import { signIn, signOut } from "@/features/authentications/utils/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const db = new PrismaClient()

export async function signup(state, formData) {
    const signupSchema = z.object({
        name: z.string().min(1, "الاسم مطلوب"),
        phoneNumber: z
            .string()
            .regex(
                /^01[0125][0-9]{8}$/,
                "رقم الهاتف غير صحيح"
            ),
        password: z.string().min(1, "كلمة السر مطلوبه"),
        confirmedPassword: z.string().min(1, "التاكيد مطلوب"),
    }).refine((data) => data.password === data.confirmedPassword, {
        message: "كلمتا السر غير متطابقتين",
        path: [],
    })

    const parsedData = signupSchema.safeParse({
        name: formData.get('name'),
        phoneNumber: formData.get('phoneNumber'),
        password: formData.get('password'),
        confirmedPassword: formData.get('confirmed-password'),
    });
    if (!parsedData.success) {
        const flattened = parsedData.error.flatten();
        return {
            fieldErrors: flattened.fieldErrors,
            formErrors: flattened.formErrors,
            data: {
                name: formData.get('name'),
                phoneNumber: formData.get('phoneNumber'),
            }
        };
    }

    // CHECK IF PHONE NUMBER EXISTS
    const { phoneNumber, password, name } = parsedData.data;
    const existingUser = await db.user.findUnique({
        where: { phoneNumber },
    })

    if (existingUser) {
        return {
            success: false,
            fieldErrors: {
                phoneNumber: ["رقم الهاتف مسجل بالفعل"],
            },
            data: {
                name: formData.get('name'),
                phoneNumber: formData.get('phoneNumber'),
            }

        }
    }
    const hashedPassword = await hash(password, 10);
    try {
        await db.user.create({
            data: {
                phoneNumber: phoneNumber,
                password: hashedPassword,
                name: name,
            }
        })
        return {
            success: true,
        }
    } catch (error) {
        return {
            success: false,
            formErrors: ["حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى."],
        }
    }
}
export async function getUserFromDb(phoneNumber) {
    try {
        return await db.user.findUnique({
            where: {
                phoneNumber: phoneNumber,
            },
        });
    } catch (error) {
        console.error("Error fetching user from DB:", error);
    }
}
export async function authenticate(state, formData) {
    const signinSchema = z.object({
        phoneNumber: z
            .string()
            .regex(
                /^01[0125][0-9]{8}$/,
                "رقم الهاتف غير صحيح"
            ),
        password: z.string().min(1, "كلمة السر مطلوبة"),
    })
    const parsedData = signinSchema.safeParse({
        phoneNumber: formData.get('phoneNumber'),
        password: formData.get('password'),
    });
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
            data: {
                phoneNumber: formData.get('phoneNumber'),
            }
        };
    }
    const { phoneNumber, password } = parsedData.data;
    try {
        await signIn("credentials", {
            phoneNumber: phoneNumber,
            password: password,
            redirect: false,
        })
        return {
            success: true,
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CallbackRouteError':
                    return {
                        message: "بيانات الدخول غير صحيحة. حاول مرة أخرى.",
                        data: {
                            phoneNumber: phoneNumber,
                        }
                    }
                default:
                    return {
                        message: "حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.",
                        data: {
                            phoneNumber: phoneNumber,
                        }
                    }
            }
        }
        return {
            message: "حدث خطأ غير متوقع. حاول مرة أخرى"
        }
    }
}
export async function signOutServerAction(state, formData) {
    try {
        await signOut({
            redirect: false,
        })
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false
        }
    }
}