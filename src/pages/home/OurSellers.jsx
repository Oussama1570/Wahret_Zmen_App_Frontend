import React, { useState } from "react";
import ProductCard from "../products/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";
import Selector from "../../components/Selector.jsx";
import "../../Styles/StylesOurSellers.css"; // Custom styles
import FadeInSection from "../../Animations/FadeInSection.jsx"; // Import fade-in animation component
import { useTranslation } from "react-i18next";


const categories = ["All", "Men", "Women", "Children"];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1400 }, items: 3, slidesToSlide: 1 },
  desktop: { breakpoint: { max: 1400, min: 1024 }, items: 3, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1, slidesToSlide: 1 },
};

const OurSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: products = [], isLoading } = useGetAllProductsQuery(undefined, {
    pollingInterval: 5000, // optional: refresh every 10s
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());

      const { t } = useTranslation();

      return (
        <FadeInSection>
          <div className="py-10 bg-[#f8f1e5] rounded-2xl shadow-md mx-4">
            {/* Title */}
            <h2 className="text-4xl text-[#5a382d] font-bold mb-6 text-center uppercase tracking-wide">
              {t("wahret_zmen_collection")}
            </h2>
      
            {/* Category Filter */}
            <div className="mb-8 flex flex-col items-center">
              <h3 className="select-category-title">{t("select_category")}</h3>
              <Selector options={categories} onSelect={setSelectedCategory} />
            </div>
      
            {/* Carousel */}
            <div className="max-w-6xl mx-auto px-2 sm:px-4">

              {filteredProducts.length > 0 ? (
                <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={3000}
                  infinite={true}
                  arrows={true}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  className="custom-carousel"
                  keyBoardControl={true}
                >
                  {filteredProducts.map((product, index) => (
                    <div key={index} className="p-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <p className="text-center text-[#5a382d] text-lg">
                  {t("no_products_found")}
                </p>
              )}
            </div>
          </div>
        </FadeInSection>
      );
};

export default OurSellers;
