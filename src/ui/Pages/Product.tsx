import React from 'react'

import Helmet from '../Helmet'
import Section, {SectionBody, SectionTitle} from '../Section'
import Grid from '../Grid'
import ProductCard from '../ProductCard'
import ProductView from '../ProductView'

import productData from '../../assets/fake-data/products'
import {TProduct} from "../../domain/product";

const Product = props => {

    const product = productData.getProductBySlug(props.match.params.slug)

    const relatedProducts = productData.getProducts(8)

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [product])

    return (
        <Helmet title={product?.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
            <Section>
                <SectionTitle>
                    Вам также может понравится
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            relatedProducts.map((product: TProduct, index) => (
                                <ProductCard
                                    key={index}
                                    product={product}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product
