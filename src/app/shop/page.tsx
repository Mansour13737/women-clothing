'use client';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import Text from '../components/Text';
import Image from 'next/image';
import Btn from '../components/Btn';

export default function Shop() {
    return (
        <div className="w-full h-auto flex flex-col items-center bg-[#dcdddc]">
            <div
                id="shop-header"
                className="relative bg-[url('/header-L.png')] w-full h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-start"
            >
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className=" p-6 rounded-xl text-center mt-8  max-w-lg"
                >
                    <h1 className="text-3xl  sm:text-4xl font-bold text-[#262013] font-display tracking-widest">
                        Discover Timeless Elegance
                    </h1>
                    <p className="mt-4 text-sm sm:text-base text-gray-700 font-light">
                        Explore our curated collection of classic & contemporary fashion.
                    </p>
                </motion.div>
                <motion.button
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 3, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <Btn style='absolute text-[14px] font-extralight border-gray-500 px-6 py-2 top-[43%] left-[13%] bg-[#262013] rounded-[3px] border-1 font-display tracking-wider text-white'>
                        EXPLORE MORE
                    </Btn>
                </motion.button>
                <motion.button
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 4, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <Image src={'/icons/down-white.svg'} alt='pic' width={40} height={40} className='opacity-50 absolute bottom-[5%] left-[50%] -translate-x-[50%]' />
                </motion.button>
            </div>
            <Text style="text-[16px] font-display font-semibold tracking-widest mb-2 bg-[#262013] w-full text-[#dcdddc] text-center py-3">
                SHOP
            </Text>
            <div className="grid grid-cols-2 gap-2 p-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <ProductCard
                        key={idx}
                        title="Linen Wrap Dress"
                        price={129}
                        oldPrice={159}
                        rating={4.8}
                        reviewCount={200}
                        imageSrc="/clothes/1.png"
                        colors={['#f5f5f5', '#1a1a1a', '#d2b48c']}
                    />
                ))}
            </div>
        </div>
    );
}
