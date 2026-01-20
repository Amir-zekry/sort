import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { ArrowUpLeft } from "lucide-react"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

import { getReviews } from "@/app/server/data"
import Link from "next/link"



export default async function CustomerReviews({ id }) {
    const reviews = await getReviews(id)
    return (
        <section className="md:w-3/4 w-full mx-auto px-4 py-10 space-y-2">
            {reviews.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyDescription>لا توجد مراجعات لهذا المنتج حاليا !</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Link
                            className="text-muted-foreground flex items-center"
                            target="_blank"
                            href={`https://docs.google.com/forms/d/e/1FAIpQLScW1Zi64BX4M8L_dlw7fdTLwKWuqu3wvcTzhdVHeez_Zk5RUA/viewform?usp=pp_url&entry.919258661=${id}`}
                        >
                            قيم المنتج <ArrowUpLeft />
                        </Link>
                    </EmptyContent>
                </Empty>
            )
                :
                <div className="space-y-2">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {reviews.map((review) => (
                            <Card key={review.name} className="hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="flex flex-row items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={review.image} alt={review.name} />
                                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{review.name}</CardTitle>
                                        <div className="flex items-center gap-1 mt-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{review.opinion}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <Link
                        className="text-muted-foreground hover:text-muted pr-2 flex items-center"
                        href={`https://docs.google.com/forms/d/e/1FAIpQLScW1Zi64BX4M8L_dlw7fdTLwKWuqu3wvcTzhdVHeez_Zk5RUA/viewform?usp=pp_url&entry.919258661=${id}`}
                    >
                        قيم المنتج <ArrowUpLeft />
                    </Link>
                </div>
            }

        </section>
    )
}
