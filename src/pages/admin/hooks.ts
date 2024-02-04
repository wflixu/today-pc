import { curl } from "@/common/http";
import { type IRes } from "./../../common/http";

import { onMounted, ref, unref } from "vue";
export const usePagination = (
  url: string,
  initCurrent: number = 1,
  initPageSize: number = 20
) => {
  const data = ref<Record<string, any>[]>([]);

  const loading = ref(false);

  const current = ref(initCurrent);
  const pageSize = ref(initPageSize);

  const run = () => {
    loading.value = true;
    curl
      .post<IRes<any>>(url, {
        current: unref(current),
        pageSize: unref(pageSize),
      })
      .subscribe((res) => {
        console.log(res);
        if (res.code == 200) {
          data.value = res.data.records as Record<string, any>[];
        }
        loading.value = false;
      });
  };

  onMounted(() => {
    run();
  });

  return {
    data,
    run,
    loading,
    current,
    pageSize,
  };
};
