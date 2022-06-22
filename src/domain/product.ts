export type TProductTitle = string;
export type TImageSource = string;

export type TCategorySlug = string;
export type TDescription = string;
export type TARLink = string;


export type TProduct = {
    slug: TUniqueId;
    title: TProductTitle;
    price: TPrice;
    image01: TImageSource;
    image02: TImageSource;
    categorySlug: string;
    colors: TColor[];
    material: TMaterial[];
    description: TDescription;
    ar?: TARLink;
};

export const colors: Record<TColor, string> = {
    white: "white",
    red: "red",
    orange: "orange",
    blue: "blue",
    yellow: "yellow",
    pink: "pink",
    black: "black",
};

export const materials: Record<TMaterial, string> = {
    ldsp: "ЛДСП",
    mdf: "МДФ",
    dvp: "ДВП",
    hpl: "HPL",
};

export function totalPrice(products: TProduct[]): TPrice {
    return "100"
    // return products.reduce((total, { price }) => total + price, 0);
}


