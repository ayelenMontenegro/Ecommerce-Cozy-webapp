import { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { height, width } = getWindowDimensions();

  const categories = [
    { src: "https://i.postimg.cc/tR8xRKn9/bat.jpg", category: "Bathroom" },
    { src: "https://i.postimg.cc/nzm4F3LR/home8.jpg", category: "Kitchenware" },
    { src: "https://i.postimg.cc/J4Q2C5tc/deco.jpg", category: "Decor" },
    {
      src: "https://i.postimg.cc/3wdn2zCV/gitfcard-Home.png",
      category: "GiftCard",
    },
    { src: "https://i.postimg.cc/R0mhJ9vz/sale.jpg", category: "sale" },
  ];

  useEffect(() => {
    window.scroll(0, 0);
    document.title = "COZY | Home";
  }, []);

  const items = categories.map((obj, index) => (
    <div key={index} style={{ backgroundImage: `url('${obj.src}')` }}>
      <Link to={`/products/${obj.category}`}>
        <button>{obj.category}</button>
      </Link>
    </div>
  ));
  console.log(width);
  console.log(height);
      return (
        <div className={styles.home}>
            <Parallax bgImage={'/assets/home1.jpg'} strength={600}>
              <Link to='/products' className={styles.homeStore}>
                <div>
                  <p>Check out our latest trends</p>
                </div>
              </Link>
            </Parallax>
            <Parallax strength={-200} className={styles.categories}>
                <h1>CATEGORIES</h1>
                <div className={styles.galleryWrap}>
                    {items}
                </div>
            </Parallax>
            <Parallax bgImage={'/assets/home5.jpg'}
            strength={300}>
              <div className={styles.info}>
                <h2>There's no place like home. </h2>
                <p>There's no place like home. In Cozy we offer a wide variety of well-designed, functional home products. Whether your home decor leans towards minimalist or maximalist aesthetic, you'll find something to suit your style.</p>
              </div>
            </Parallax>
            <Parallax strength={-4}  className={styles.fondoInfo} bgImage={"https://i.postimg.cc/KzD7qN4y/banner9.png"}>
            </Parallax>
            <Parallax bgImage={'/assets/home4.jpg'}
            strength={-400}renderLayer={(percentage) => (
                <div
                  className={styles.finalInfo}
                  style={{
                    background: `rgba(212, 197, 191, ${percentage * 2})`,
                    width: percentage * 100,
                    height: percentage * 100
                  }}>
                </div>
              )}>
            </Parallax>
        </div>
    )
  }
  export default Home

//   return (
//     <div className={styles.home}>
//       <Parallax
//         bgImage={"/assets/home1a.jpg"}
//         strength={width > 700 ? width / 1.4 : height}
//       >
//         <Link to="/products" className={styles.homeStore}>
//           <div>
//             <p>Check out our latest trends</p>
//           </div>
//         </Link>
//       </Parallax>
//       <Parallax strength={height / 20} className={styles.categories}>
//         <h1>CATEGORIES</h1>
//         <div className={styles.galleryWrap}>{items}</div>
//       </Parallax>
//       <Parallax
//         bgImage={"/assets/home5a.jpg"}
//         strength={width > 700 ? -width / 8 : height}
//       >
//         <div className={styles.info}>
//           <h2>There's no place like home. </h2>
//           <p>
//             There's no place like home. In Cozy we offer a wide variety of
//             well-designed, functional home products. Whether your home decor
//             leans towards minimalist or maximalist aesthetic, you'll find
//             something to suit your style.
//           </p>
//         </div>
//       </Parallax>
//       <Parallax
//         strength={height / 20}
//         className={styles.fondoInfo}
//         bgImage={"https://i.postimg.cc/KzD7qN4y/banner9.png"}
//       ></Parallax>
//       <Parallax
//         bgImage={"/assets/home4a.jpg"}
//         strength={width > 700 ? width / 1.4 : height}
//         renderLayer={(percentage) => (
//           <div
//             className={styles.finalInfo}
//             style={{
//               background: `rgba(212, 197, 191, ${percentage * 2})`,
//               width: percentage * 100,
//               height: percentage * 100,
//             }}
//           ></div>
//         )}
//       ></Parallax>
//     </div>
//   );
// };
// export default Home;
