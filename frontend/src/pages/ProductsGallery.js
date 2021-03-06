import styles from "../styles/ProductsGallery.module.css"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import ProductCard from "../components/ProductCard"
import CartCard from "../components/CartCard"
import productsActions from "../redux/actions/productsActions"
import { Link } from "react-router-dom"
import Header from "../components/Header"

const ProductsGallery = ({
  products,
  getProducts,
  productsCategory,
  match,
  getProductByCategory,
}) => {
  const [loading, setLoading] = useState(true)
  const [showCartCard, setShowCartCard] = useState(false)
  const [productAlert, setProductAlert] = useState(null)
  const [order, setOrder] = useState(null)
  const [view, setView] = useState({ category: null, subcategory: null })

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "COZY | STORE"
    if (!products.length) {
      
      getProducts()
      .then(res => {
        if(res.success) {
          getProductByCategory(match.params.category)
          setLoading(false)
        }
      })
    } else {
      getProductByCategory(match.params.category)
      setLoading(false)
    }
    if (match.params.category) {
      setView({ category: match.params.category, subcategory: null })
      setLoading(false)
    } else {
      setView({ category: null, subcategory: null })
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params])

  if (!order) {
    productsCategory.sort((a, b) => a.stock - b.stock)
  }
  const editShowCartCard = (newState) => {
    setShowCartCard(newState)
  }

  if (productAlert) {
    setTimeout(() => {
      setProductAlert(null)
    }, 2500)
  }

  if (loading) {
    return (
      <>
        <div className={styles.productsGallery}>
          <div className="loader">
            <div style={{backgroundImage: `url("./assets/c.png")`}} className="preloaderImage"></div>
            <h1>LOADING...</h1>
          </div>
        </div>
      </>
    )
  }

  const sortProducts = (e) => {
    if (e.target.value !== "relevant") {
      productsCategory.sort((a, b) =>
        e.target.value === "minor" ? a.price - b.price : b.price - a.price
      )
    } else {
      productsCategory.sort((a, b) => a.stock - b.stock)
    }
    setOrder(e.target.value)
  }

  let productsSubcategory = !view.subcategory
    ? productsCategory
    : productsCategory.filter((obj) => obj.subcategory === view.subcategory)

  const viewHandler = (e) => {
    setView({ ...view, subcategory: e.target.value })
  }

  return (
    <>
      <Header />
      <div className={styles.productsGallery}>
        <div className={styles.filterContainer}>
          <div className={styles.inputContainer}>
            <div>
              <Link to="/products">All products</Link>
            </div>
            <div className={styles.filterInside}>
              <Link to="/products/kitchenware">Kitchenware</Link>
              {view.category === "kitchenware" && (
                <div>
                  <input
                    type="button"
                    value="accesories"
                    onClick={viewHandler}
                  />
                  <input
                    type="button"
                    value="glassware"
                    onClick={viewHandler}
                  />
                  <input
                    type="button"
                    value="tableware"
                    onClick={viewHandler}
                  />
                </div>
              )}
            </div>
            <div className={styles.filterInside}>
              <Link to="/products/bathroom">Bathroom</Link>
              {view.category === "bathroom" && (
                <div>
                  <input
                    type="button"
                    value="accesories"
                    onClick={viewHandler}
                  />
                  <input type="button" value="mirrors" onClick={viewHandler} />
                </div>
              )}
            </div>
            <div className={styles.filterInside}>
              <Link to="/products/decor">Decor</Link>
              {view.category === "decor" && (
                <div>
                  <input
                    type="button"
                    value="accesories"
                    onClick={viewHandler}
                  />
                  <input type="button" value="home" onClick={viewHandler} />
                  <input type="button" value="lighting" onClick={viewHandler} />
                </div>
              )}
            </div>
            <div>
              <Link to="/products/giftcard">Gift Card</Link>
            </div>
            <div>
              <Link to="/products/sale">Sale</Link>
            </div>
            <div className={styles.sectiontSelect}>
              <select onChange={sortProducts}>
                <option value="relevant">Most relevant</option>
                <option value="minor">Lower to higher</option>
                <option value="mayor">Higher to lower</option>
              </select>
            </div>
          </div>
          <div>
            <hr />
            <h1>COZY</h1>
          </div>
        </div>
        {productAlert && (
          <CartCard
            productAlert={productAlert}
            showCartCard={showCartCard}
            editShowCartCard={editShowCartCard}
          />
        )}
        <div className={styles.productsCards}>
          {productsSubcategory.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                editShowCartCard={editShowCartCard}
                setProductAlert={setProductAlert}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    productsCategory: state.products.productsCategory,
  }
}

const mapDispatchToProps = {
  getProducts: productsActions.getProducts,
  getProductByCategory: productsActions.getProductByCategory,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsGallery)
