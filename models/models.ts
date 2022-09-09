export interface ICategory {
    id: number,
    name: string,
    picture: string
}

export interface IBrand {
    id: number,
    name: string
}

export interface IFilterName {
    id: number,
    name: string,
    categoryId: number,
}




export interface IProductRequest {
    id: number,
    name: string,
    categoryId: number,
    brandId: number,
    picture: string,
    price: number,
    rating: number,
    ratingCount: number,
    properties: IProperty[]
    comments: IComment[]
}

export interface IProductsCountResponse {
    rows:IProduct[],
    count:number
    
}

interface IId {
    id: number,
}

export interface IProductDto {
    id: number,
    name: string,
}



export interface IFilterValue {
    id: number,
    categoryId: number,
    filterNameId: number,
    filterName: string,
    value: string,
    productQty: number
}

export interface IFilteredProductRequest {
    priceRange: number[],
    categoryId: number,
    filters: IFilterValue[],
    limit: number,
    page: number
}

export interface IFilteredProductRespons {
    filterValueQuantities: IFilterValueQuantities[],
    products: IExtendedProduct[],
    count: number
}


export interface IExtendedProduct {
    id: number,
    name: string,
    categoryId: number,
    brandId: number,
    picture: string,
    price: number,
    rating: number,
    ratingCount: number,
    properties: IProperty[]
    comments: IId[]
}

export interface IProduct {
    id: number,
    name: string,
    categoryId: number,
    brandId: number,
    picture: string,
    price: number,
    rating: number,
    ratingCount: number,
}

export interface IForFilterInstance {
    productId: number,
    filterValues: IFilterValue[]
}

interface IFilterValueQuantities {
    id: number,
    productQty: number,
    categoryId: number,
    filterNameId: number,
    filterName: string,
    value: string,
}


export interface ILimitPage {
    limit: number,
    page: number
}

export interface IUser {
    id: number;
    email: string;
    mame: string;
    password: string;
    confirmLink: string;
    refreshToken: string;
    confirmedEmail: string;

}

export interface ILogin {
    email: string,
    password: string
}

export interface ILimitOffset {
    limit: number,
    offset: number
}

export interface AuthState {
    userId: string,
    userName: string,
    userRole: string,
    accessToken: string,
    isAuth: boolean,
    emailConfirmed: boolean
}

export interface AuthPayload {
    userId: string,
    userName: string,
    userRole: string,
    accessToken: string,
    emailConfirmed: boolean
}

export interface ILoginResponse {
    id: string,
    email: string,    
    role: string,
    accessToken: string,
    refreshToken: string,
    emailConfirmed: boolean
}

export interface IComment {
    id: number,
    productId: number,
    userId: number,
    userName: string,
    content: string,
}


export interface ICommentRespose {
    rows: IComment[],
    count: number,

}

export interface IProperty {
    id: number,
    productId: number,
    name: string,
    value: string,

}


export interface IFilterInstance {
    id: number,
    productId: number,
    categoryId: number,
    filterNameId: number,
    filterName: string,
    value: string,

}

export interface INewProductRequest {
    product: IProduct,
    selectedFilterValues: IFilterValue[],
    properties: IProperty[]
}

export interface IRating {
    rating:number,
    productId: number,
    userId: number
}

export interface IRatingDataRespose {
    userRating:number,
    productRating: string,
   
}


