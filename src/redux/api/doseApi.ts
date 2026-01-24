import { Medicine } from "@/types/medicine";
import { baseApi } from "./baseApi";

const doseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDose: builder.query({
      query: () => {
        return {
          url: "/doses",
        };
      },
      providesTags: ["doses"],
    }),
    deleteADose: builder.mutation<{ success: boolean }, string>({
      query: (id) => {
        return {
          url: `/doses/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["doses"],
    }),
    addADose: builder.mutation<{ data: Medicine }, Partial<Medicine>>({
      query: (dose) => {
        return {
          url: `/doses`,
          method: "POST",
          body: dose,
        };
      },
      invalidatesTags: ["doses"],
    }),
    getSingleDose: builder.query({
      query: (id: string) => {
        return {
          url: `/doses/${id}`,
        };
      },
      providesTags(result, error, id) {
        return [{ type: "doses", id: id }];
      },
    }),
    updateSingleDose: builder.mutation<
      { success: boolean },
      { id: string; name: string }
    >({
      query: ({ id, name }) => {
        return {
          url: `/doses/${id}`,
          method: "PATCH",
          body: { doseName: name },
        };
      },
      invalidatesTags(result, error, { id }) {
        return [{ type: "doses", id: id }, "doses"];
      },
    }),
  }),
});

export const {
  useGetAllDoseQuery,
  useDeleteADoseMutation,
  useAddADoseMutation,
  useGetSingleDoseQuery,
  useUpdateSingleDoseMutation,
} = doseApi;
