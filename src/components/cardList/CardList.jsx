import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";

const getData = async (page, cat) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const CardList = async ({ page, cat }) => {
  try {
    const { posts, count } = await getData(page, cat);

    const POST_PER_PAGE = 2;

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Recent Posts</h1>
        <div className={styles.posts}>
          {posts?.map((item) => (
            <Card item={item} key={item._id} />
          ))}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    );
  } catch (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Error</h1>
        <p className={styles.error}>
          Failed to load posts. Please try again later.
        </p>
      </div>
    );
  }
};

export default CardList;
