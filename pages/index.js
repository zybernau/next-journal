import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import jrnlStyle from '../styles/journals.module.css'
import loaderStyle from '../styles/loader.module.css'
import loader from './loader';

export default function Home() {
  const [journals, setJournals] = useState([]);
  const [journal, setJournal] = useState({});

  // useEffect during component loading
  useEffect(() => {
    fetchJournals();
  }, []);

  // useEffect during component rendering
  useEffect(() => {
    if (journal.id) {
      fetchJournal(journal.id);
    }
  }, [journal.id]);

  const fetchJournal = async (id) => {
    const response = await fetch(`/api/journals/${id}`);

    if (response) {
      const data = await response.json();
      setJournal(data);
    }
  };

  const fetchJournals = async () => {


    const response = await fetch('/api/journals');

    if (response) {
      const data = await response.json();
      setJournals(data);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Journey</title>
        <meta name="description" content="Journey App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Journey
        </h1>

        <div className={styles.grid}>
          <Link className={styles.card} href="/new-journal">Create New Journal</Link>
        </div>


        {(journals && journals.length > 0) ?
          <div className={jrnlStyle.list}>
            {
              journals.map(journal => {
                return (
                  <div key={journal.id} className={jrnlStyle.journal}>
                    <div className={jrnlStyle.journlHead}>
                      <div className={jrnlStyle.journlHeadItem}>
                        {journal.title}
                      </div>
                      <div className={jrnlStyle.date}>
                        {journal.date}
                      </div>
                    </div>
                    <div className={jrnlStyle.message}>
                      {journal.message}
                    </div>
                  </div>
                )
              })
            }
          </div> :
          <div className={loaderStyle.pulseContainer}>
            <div className={[loaderStyle.pulseBubble, loaderStyle.pulseBubble1]}></div>
            <div className={[loaderStyle.pulseBubble, loaderStyle.pulseBubble2]}></div>
            <div className={[loaderStyle.pulseBubble, loaderStyle.pulseBubble3]}></div>
          </div>
        }
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
