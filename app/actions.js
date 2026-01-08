'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { th } from "zod/v4/locales";

const db = new PrismaClient()



export async function createOrder(state, formData) {

    const formSchema = z.object({
        FullName: z.string().min(1, "الاسم مطلوب"),
        PhoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
        Address: z.string().min(1, "العنوان مطلوب"),
        Governorate: z.string().min(1, "المحافظة مطلوبة"),
        quantity: z.coerce.number().min(1, "الكمية يجب أن تكون على الأقل 1")
    })

    const parsedData = formSchema.safeParse({
        FullName: formData.get('FullName'),
        PhoneNumber: formData.get('PhoneNumber'),
        Address: formData.get('Address'),
        Governorate: formData.get('Governorate'),
        quantity: formData.get('quantity') // Handles select input default
    });
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
        };
    }
    const { FullName, PhoneNumber, Address, Governorate, quantity } = parsedData.data;
    try {
        const customer = await db.customer.create({
            data: {
                name: FullName,
                number: PhoneNumber,
                address: Address,
                governorate: Governorate,
            }
        })
        const order = await db.order.create({
            data: {
                total: parseFloat(formData.get('total')),
                notes: formData.get('Notes'),
                quantity: quantity,
                customer: {
                    connect: { id: customer.id }
                },
                item: {
                    connect: { id: formData.get('itemId') },
                },
            },
        });
        redirect(`/confirmation?orderId=${order.id}`)
    } catch (error) {
        if (!isRedirectError(error)) {
            console.error("Order creation failed:", error)
        }
        throw error // still let redirect work
    }
}


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
    const { phoneNumber, password, name } = parsedData.data;
    const hashedPassword = await hash(password, 10);
    try {
        await db.user.create({
            data: {
                phoneNumber: phoneNumber,
                password: hashedPassword,
                name: name,
            }
        })
        redirect("/login")
    } catch (error) {
        throw error
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
            redirectTo: "/",
        })
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
        throw error
    }
}