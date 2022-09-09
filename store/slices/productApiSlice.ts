import { IBrand, ICategory, IFilteredProductRespons, IFilteredProductRequest, ILimitPage, INewProductRequest,  IProductRequest,  IProperty, IProduct, IProductsCountResponse } from "../../models/models"
import { shopApi } from "../shop.api"

export const productApiSlice = shopApi.injectEndpoints({
    endpoints:  build => ({        
        getCategiries: build.query<ICategory[],''>({
            query: () => ({
                url: 'product/getCategories',
                method: 'GET',                
            }),  
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'category' as const, id })),
                    { type: 'category', id: 'LIST' },]
                    : [{ type: 'category', id: 'LIST' }],          
        }),
        newCategory: build.mutation<ICategory, ICategory>({
            query: (category) => ({
                url: 'product/newCategory',
                method: 'POST',
                body: { category }
            }), 
            invalidatesTags: [{ type: 'category', id: 'LIST' }], //авто обновление            
        }),
        deleteCategory: build.mutation<number, number>({
            query: (id) => ({
                url: 'product/deleteCategory',
                method: 'DELETE',
                body: { id }
            }), 
            invalidatesTags: [{ type: 'category', id: 'LIST' }], //авто обновление            
        }),
        //-----------------------------------------
        getBrands: build.query<IBrand[],''>({
            query: () => ({
                url: 'product/getBrands',
                method: 'GET',                
            }),  
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'brand' as const, id })),
                    { type: 'brand', id: 'LIST' },]
                    : [{ type: 'brand', id: 'LIST' }],          
        }),
        newBrand: build.mutation<IBrand, IBrand>({
            query: (brand) => ({
                url: 'product/newBrand',
                method: 'POST',
                body: { brand }
            }), 
            invalidatesTags: [{ type: 'brand', id: 'LIST' }], //авто обновление           
        }),
        deleteBrand: build.mutation<number, number>({
            query: (id) => ({
                url: 'product/deleteBrand',
                method: 'DELETE',
                body: { id }
            }), 
            invalidatesTags: [{ type: 'brand', id: 'LIST' }], //авто обновление           
        }),
        //-----------------------------------------
        
        newProduct: build.mutation<IProduct, INewProductRequest>({
            query: (body) => ({
                url: 'product/newProduct',
                method: 'POST',
                body
            }), 
            invalidatesTags: [{ type: 'product', id: 'LIST' }], //авто обновление           
        }),
        deleteProduct: build.mutation<number, number>({
            query: (id) => ({
                url: 'product/deleteProduct',
                method: 'DELETE',
                body: { id }
            }), 
            invalidatesTags: [{ type: 'product', id: 'LIST' }], //авто обновление           
        }),
        getFilteredProducts: build.mutation<IFilteredProductRespons, IFilteredProductRequest>({
            query: (filterRequest) => ({
                url: 'product/getFilteredProducts',
                method: 'POST',
                body: { filterRequest }
            }),                      
        }),

        newProperty: build.mutation<IProperty[], IProperty[]>({
            query: (properties) => ({
                url: 'product/newProperty',
                method: 'PUT',
                body: { properties }
            }),                      
        }), 
        getProduct: build.query<IProductRequest,number>({
            query: (id) => ({
                url: 'product/getProduct',
                method: 'GET',   
                params: {id:id}            
            }),  
                    
        }),
        getProducts: build.query<IProductsCountResponse,ILimitPage>({
            query: (params) => ({
                url: 'product/getProducts',
                method: 'GET',   
                params: {limit:params.limit, page: params.page}            
            }),  
            providesTags: (result) =>
                result
                    ? [...result.rows.map(({ id }) => ({ type: 'product' as const, id })),
                    { type: 'product', id: 'LIST' },]
                    : [{ type: 'product', id: 'LIST' }],        
        }),

    })
})

export const {   
    useGetCategiriesQuery,
    useNewCategoryMutation,
    useDeleteCategoryMutation,
    useGetBrandsQuery,
    useNewBrandMutation,
    useDeleteBrandMutation,    
    useNewProductMutation,
    useDeleteProductMutation,
    useGetFilteredProductsMutation,
    useNewPropertyMutation,
    useGetProductQuery,
    useGetProductsQuery
} = productApiSlice