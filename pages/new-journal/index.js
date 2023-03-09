import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'


export default function NewJournal() {

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const insertJournal = async () => {
    const dateNow = new Date();
    const date = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
    const newJournal = {
      title,
      message,
      date
    };
    const response = await fetch('api/journals', {
      method: 'POST',
      body: JSON.stringify({ newJournal }),
      header: {
        "content-type": "application/json"
      }
    });
    const data = await response.json();
    console.log("got the response", data);
    // if (data.isAcknowledged === true) {
    //   fetchJournals();
    // }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Journey</title>
        <meta name="description" content="Journey App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create Journey
        </h1>

        <div className={styles.grid}>
          <Link className={styles.card} href="/">Back to Home</Link>
        </div>

        <div>
          <div>
            <input type="text" value={title} onChange={
              e => setTitle(e.target.value)
            } />
          </div>
          <div>
            <textarea value={message} onChange={
              e => setMessage(e.target.value)
            } />
          </div>
          <div>
            <button onClick={insertJournal}>Create Journal</button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}