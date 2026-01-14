'use server'
import { PrismaClient } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import z from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const db = new PrismaClient()



export async function createOrder(state, formData) {

    const formSchema = z.object({
        FullName: z.string().min(1, "الاسم مطلوب"),
        PhoneNumber: z.string().min(1, "رقم الهاتف مطلوب"),
        Address: z.string().min(1, "العنوان مطلوب"),
        Governorate: z.string().min(1, "المحافظة مطلوبة"),
    })

    const parsedData = formSchema.safeParse({
        FullName: formData.get('FullName'),
        PhoneNumber: formData.get('PhoneNumber'),
        Address: formData.get('Address'),
        Governorate: formData.get('Governorate'),
    });
    if (!parsedData.success) {
        return {
            errors: parsedData.error.flatten().fieldErrors,
        };
    }
    const { FullName, PhoneNumber, Address, Governorate } = parsedData.data;
    const items = JSON.parse(formData.get('items')) // 🔥 important

    // 1️⃣ Fetch items from DB (security)
    const dbItems = await db.item.findMany({
        where: { id: { in: items.map(i => i.itemId) } }
    })
    let total = 45 // shipping
    const orderItemsData = items.map(i => {
        const item = dbItems.find(d => d.id === i.itemId)
        total += item.price * i.quantity

        return {
            itemId: item.id,
            quantity: i.quantity,
        }
    })
    const mode = formData.get('mode')
    const userId = formData.get('userId')
    let cart
    if (mode === 'cart' && userId) {
        cart = await db.cart.findUnique({
            where: { userId: userId },
            select: { id: true }
        })
    }
    try {
        const order = await db.order.create({
            data: {
                total: total,
                notes: formData.get('Notes'),
                customer: {
                    create: {
                        name: FullName,
                        number: PhoneNumber,
                        address: Address,
                        governorate: Governorate,
                    }
                },
                items: {
                    createMany: {
                        data: orderItemsData
                    }
                }
            },
        });
        await db.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        })
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
export async function addToCart(userId, itemId) {
    try {
        let cart = await db.cart.findUnique({
            where: {
                userId: userId,
            },
            include: {
                cartItems: true,
            },
        });
        if (!cart) {
            cart = await db.cart.create({
                data: {
                    user: {
                        connect: { id: userId },
                    },
                },
                include: {
                    cartItems: true,
                },
            });
        }
        if (cart.cartItems.some(ci => ci.itemId === itemId)) {
            return {
                success: false,
                message: "العنصر موجود بالفعل في العربه"
            }
        }
        await db.cartItem.create({
            data: {
                cart: {
                    connect: { id: cart.id },
                },
                item: {
                    connect: { id: itemId },
                },
            },
        });
        return {
            success: true,
            message: "تمت إضافة العنصر إلى العربه بنجاح"
        }
    } catch (error) {
        return {
            success: false,
            message: "حدث خطأ أثناء إضافة العنصر إلى العربه"
        }
    }
}
export async function increaseCartItemQuantity(cartItemId) {
    try {
        await db.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity: {
                    increment: 1
                },
            }
        })
        revalidatePath('/')
    } catch (error) {
        console.error(error)
    }
}
export async function decreaseCartItemQuantity(cartItemId) {
    try {
        await db.cartItem.update({
            where: {
                id: cartItemId,
            },
            data: {
                quantity: {
                    decrement: 1
                },
            }
        })
        revalidatePath('/')
    } catch (error) {
        console.error(error)
    }
}