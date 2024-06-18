import React from 'react';
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import QlDanhMuc from '../../components/Dashboard/QlDanhMuc';


const QlDanhmucPage = () => {
  return (
    <DefaultLayout>
      <QlDanhMuc/>
    </DefaultLayout>
  )
}

export default QlDanhmucPage