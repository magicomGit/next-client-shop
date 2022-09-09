import { IFilterInstance, IFilterName, IFilterValue, IForFilterInstance } from "../../models/models"
import { shopApi } from "../shop.api"

export const filterApiSlice = shopApi.injectEndpoints({
    endpoints: build => ({
        //-----------------------------------------
        getFilterNames: build.query<IFilterName[], number>({
            query: (categoryId) => ({
                url: 'filter/getFilterNames',
                method: 'GET',
                params: { categoryId }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'catProperty' as const, id })),
                    { type: 'catProperty', id: 'LIST' },]
                    : [{ type: 'catProperty', id: 'LIST' }],
        }),
        newFilterName: build.mutation<IFilterName, IFilterName>({
            query: (filterName) => ({
                url: 'filter/newFilterName',
                method: 'POST',
                body: { filterName }
            }),
            invalidatesTags: [{ type: 'catProperty', id: 'LIST' }], //авто обновление           
        }),
        deleteFilterName: build.mutation<number, number>({
            query: (id) => ({
                url: 'filter/deleteFilterName',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: [{ type: 'catProperty', id: 'LIST' }], //авто обновление           
        }),
        //-----------------------------------------
        getFilterValuesByFilterNameId: build.query<IFilterValue[], number>({
            query: (filterNameId) => ({
                url: 'filter/getFilterValuesByFilterNameId',
                method: 'GET',
                params: { filterNameId }
            }),
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'propTemplate' as const, id })),
                    { type: 'propTemplate', id: 'LIST' },]
                    : [{ type: 'propTemplate', id: 'LIST' }],
        }),
        getFilterValuesByCategoryId: build.query<IFilterValue[], number>({
            query: (categoryId) => ({
                url: 'filter/getFilterValuesByCategoryId',
                method: 'GET',
                params: { categoryId }
            })            
        }),
        newFilterValue: build.mutation<IFilterValue, IFilterValue>({
            query: (template) => ({
                url: 'filter/newFilterValue',
                method: 'POST',
                body: { template }
            }),
            invalidatesTags: [{ type: 'propTemplate', id: 'LIST' }], //авто обновление           
        }),
        deleteFilterValue: build.mutation<number, number>({
            query: (id) => ({
                url: 'filter/deleteFilterValue',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: [{ type: 'propTemplate', id: 'LIST' }], //авто обновление           
        }),
        newFilterInstance: build.mutation<IFilterInstance[], IFilterInstance[]>({
            query: (filterInstances) => ({
                url: 'filter/newFilterInstance',
                method: 'POST',
                body: { filterInstances }
            }),                      
        }),
        



    })
})

export const {
    useGetFilterNamesQuery,
    useNewFilterNameMutation,
    useDeleteFilterNameMutation,
    useGetFilterValuesByFilterNameIdQuery,
    useNewFilterValueMutation,
    useDeleteFilterValueMutation,
    useGetFilterValuesByCategoryIdQuery,
    useNewFilterInstanceMutation,
    
} = filterApiSlice