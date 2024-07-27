import React from 'react';
import CardDataStats from '../CardDataStats';

import WatchIcon from '@/public/vector/eye.svg';
import CartIcon from '@/public/vector/cart.svg';
import AccountIcon from '@/public/vector/bag.svg';
import UsersIcon from '@/public/vector/users.svg';

const TrangChuAd: React.FC = () => {
  return (
    <section className="antialiase overflow-y-auto px-4 pt-5 lg:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Tổng Số Bài Học" total="5,6K" rate="4.3%" levelUp>
          <WatchIcon className="fill-primary dark:fill-white" />
        </CardDataStats>

        <CardDataStats
          title="Tổng Số Bài Viết"
          total="1,2K"
          rate="1.35%"
          levelUp
        >
          <CartIcon className="fill-primary dark:fill-white" />
        </CardDataStats>

        <CardDataStats
          title="Tổng Số Tài Khoản"
          total="2450"
          rate="0.59%"
          levelUp
        >
          <AccountIcon className="fill-primary dark:fill-white" />
        </CardDataStats>

        <CardDataStats title="Tổng Số..." total="3.456" rate="0.95%" levelDown>
          <UsersIcon className="fill-primary dark:fill-white" />
        </CardDataStats>
      </div>
    </section>
  );
};

export default TrangChuAd;
