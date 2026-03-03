import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import FeaturedProducts from '@/features/featuredProducts/components/featuredProducts'
import { FeaturedProductsSkeleton } from '@/features/featuredProducts/skeletons/FeaturedProductsSkeleton'



const highlights = [
  {
    icon: '💸',
    title: 'اقل سعر',
    description: 'اقل سعر في مصر',
  },
  {
    icon: '↩️',
    title: 'ضمان استرجاع',
    description: '14 يوم لاسترجاع المنتج',
  },
  {
    icon: '🔒',
    title: 'دفع آمن',
    description: 'دفع عند الاستلام',
  },
  {
    icon: '💬',
    title: 'دعم 24/7',
    description: 'فريق دعم مخصص',
  },
]
const categories = [
  {
    icon: '🧴',
    name: 'عنايتك الشخصة',
    slug: 'personal-care'
  },
  {
    icon: '👕',
    name: 'دولابك',
    slug: 'wardrobe'
  },
  {
    icon: '⚽',
    name: 'رياضتك',
    slug: 'fitness'
  },
]

export default async function Home() {

  return (
    <>
      {/* Hero Section */}
      <section className='relative overflow-hidden py-32 md:py-40'>
        <div className='from-primary/5 via-primary/10 to-background pointer-events-none absolute inset-0 bg-linear-to-b' />
        <div className='from-primary/20 pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] via-transparent to-transparent opacity-50' />
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-foreground text-4xl font-bold tracking-tight md:text-6xl'>
            اكتشف EG MEN
          </h1>
          <p className='text-muted-foreground mt-4 max-w-xl text-center text-lg md:text-xl'>
            بنوفر كل احتياجات الراجل المصري, من العناية الشخصية لحد الموضة والرياضة، كل ده في مكان واحد وبأسعار تناسب الجميع.
          </p>
          <div className='mt-8 flex flex-col items-center gap-4 sm:flex-row'>
            <Link href='#categories'>
              <Button>تصفح الفئات</Button>
            </Link>
            <Link href='#featured'>
              <Button>تصفح المنتجات المميزة</Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Highlights */}
      <section className='border-border/50 border-y'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='divide-border/50 grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0'>
            {highlights.map(item => (
              <div key={item.title} className='px-6 py-8 text-center'>
                <span className='text-3xl'>{item.icon}</span>
                <h3 className='text-foreground mt-3 font-semibold'>
                  {item.title}
                </h3>
                <p className='text-muted-foreground mt-1 text-sm'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id='categories' className='py-20'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='mb-10 flex items-end justify-between'>
            <div>
              <h2 className='text-foreground text-3xl font-bold tracking-tight'>
                تصفح حسب الفئة
              </h2>
              <p className='text-muted-foreground mt-2'>
                هتلاقي اللي بتدور عليه بسهولة في أقسامنا المتنوعة، من العناية الشخصية لحد الموضة والرياضة.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {categories.slice(0, 8).map(category => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className='group border-border/50 from-card to-card/80 hover:border-primary/30 hover:shadow-primary/5 relative overflow-hidden rounded-2xl border bg-linear-to-br p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

                <div className='relative z-10'>
                  <div className='bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110'>
                    {category.icon}
                  </div>

                  <h3 className='text-foreground font-semibold tracking-tight'>
                    {category.name}
                  </h3>

                  <div className='text-primary mt-2 flex items-center text-sm font-medium opacity-0 transition-all duration-300 group-hover:opacity-100'>
                    Browse
                    <svg
                      className='ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 7l5 5m0 0l-5 5m5-5H6'
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* <div className='mt-8 text-center'>
            <Link
              href='/categories'
              className='text-primary hover:text-primary/80 inline-flex items-center text-sm font-medium'
            >
              View all {categories.length} categories
              <svg
                className='ml-1 h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Featured Products */}
      <section id='featured' className='bg-muted/30 py-20'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='mb-10 flex items-end justify-between'>
            <div>
              <h2 className='text-foreground text-3xl font-bold tracking-tight'>
                المنتجات المميزة
              </h2>
              <p className='text-muted-foreground mt-2'>
                  اكتشف أفضل المنتجات المختارة بعناية من كل فئة، عشان نضمنلك تجربة تسوق مميزة ومريحة.
              </p>
            </div>
          </div>

          <Suspense fallback={<FeaturedProductsSkeleton />}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* CTA Banner */}
      {/* <section className='py-20'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='from-primary to-primary/80 relative overflow-hidden rounded-3xl bg-linear-to-br px-8 py-16 text-center md:px-16'>
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent' />
            <div className='relative z-10'>
              <h2 className='text-primary-foreground text-3xl font-bold md:text-4xl'>
                Join the Curio Community
              </h2>
              <p className='text-primary-foreground/80 mx-auto mt-4 max-w-xl'>
                Subscribe to our newsletter for exclusive deals, new arrivals,
                and curated picks delivered straight to your inbox.
              </p>
              <form className='mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='placeholder:text-muted-foreground text-foreground h-12 flex-1 rounded-full bg-white px-5 text-sm focus:ring-2 focus:ring-white/50 focus:outline-none'
                />
                <button
                  type='submit'
                  className='bg-foreground text-background hover:bg-foreground/90 h-12 rounded-full px-8 text-sm font-medium transition-colors'
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </>
  )
}
