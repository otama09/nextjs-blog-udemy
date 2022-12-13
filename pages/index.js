import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout, { siteTitle } from "../components/Layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>はじめまして！私はエンジニアです！</p>
      </section>
      <section>
        <h2>ブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <small className={utilStyles.lightText_center}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
