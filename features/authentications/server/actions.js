'use server'
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import z from "zod";
import { signIn, signOut } from "@/features/authentications/utils/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const db = new PrismaClient()

export async function signup(state, formData) {

    // VALIDATION  
    const signupSchema = z.object({
        name: z.string().min(3, "الاسم مطلوب"),
        phoneNumber: z
            .string()
            .regex(/^01[0125][0-9]{8}$/, "ادخل رقم هاتف مصري"),

        password: z
            .string()
            .min(8, "كلمة السر يجب أن تكون 8 حروف على الأقل")
            .regex(/[A-Za-z]/, "كلمة السر يجب أن تحتوي على حرف واحد على الأقل")
            .regex(/[0-9]/, "كلمة السر يجب أن تحتوي على رقم واحد على الأقل")
            .regex(/[^A-Za-z0-9]/, "كلمة السر يجب أن تحتوي على رمز واحد على الأقل")
            .regex(/^\S*$/, "كلمة السر لا يجب أن تحتوي على مسافات"),

        confirmedPassword: z.string().min(1, "التاكيد مطلوب"),
    })
        .refine((data) => data.password === data.confirmedPassword, {
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
            passwordDsntMatchError: flattened.formErrors[0],
            data: {
                name: formData.get('name'),
                phoneNumber: formData.get('phoneNumber'),
            }
        };
    }
    const { phoneNumber, password, name } = parsedData.data;

    // CHECK IF PHONE NUMBER EXISTS

    const existingUser = await db.user.findUnique({
        where: { phoneNumber },
    })

    if (existingUser) {
        return {
            success: false,
            hasAnAccountError: ["رقم الهاتف مسجل بالفعل"],
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
            message: "تم انشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن",
            data: {
                phoneNumber: phoneNumber
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.",
        }
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
            redirectTo: formData.get('callbackUrl'),
        })
        return {
            success: true,
            message: 'تم تسجيل الدخول بنجاح'
        }
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CallbackRouteError') {
                return {
                    InvalidCredentials: error.cause.err.message,
                    data: {
                        phoneNumber: phoneNumber,
                    }
                }
            } else {
                return {
                    error: "تعذر تسجيل الدخول حالياً. حاول مرة أخرى لاحقاً.",
                    data: {
                        phoneNumber: phoneNumber,
                    }
                }
            }
        } else if (isRedirectError) {
            throw error
        } else {
            return {
                success: false,
                message: "حدث خطأ غير متوقع. حاول مرة أخرى"
            }
        }
    }
}
export async function signOutServerAction() {
    try {
        await signOut({
            redirect: false
        })
        return {
            success: true,
            message: 'تم تسجيل الخروج بنجاح'
        }
    } catch (error) {
        return {
            success: false,
            message: 'حدث خطا اثناء تسجيل الخروج'
        }
    }
}