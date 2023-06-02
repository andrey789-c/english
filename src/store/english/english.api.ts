import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IWord } from '../../models/model'

export const englishApi = createApi({
  reducerPath: '/api/',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    getEnglishWords: build.query<IWord[], null>({
      query: () => ({
        url: `/words/`
      }),
      transformResponse(responce: IWord[]) {
        return responce.reverse()
      },
    }),
    createEnglistWords: build.mutation({
      query: (payload) => ({
        url: '/words',
        method: 'POST',
        body: payload,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
    }),
    deleteEnglishWord: build.mutation({
      query: (id: number) => ({
        url: `/words/${id}`,
        method: 'DELETE',
      }),
    })
  })
})

export const {useCreateEnglistWordsMutation, useGetEnglishWordsQuery, useDeleteEnglishWordMutation} = englishApi