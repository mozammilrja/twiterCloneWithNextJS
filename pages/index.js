import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>TwitterClone</title>
      </Head>
      <main className='min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
        {/* sidebar */}
        <Feed />
        {/* feed */}
        {/* widgets */}
        {/* modal */}
      </main>
    </div>
  );
}
