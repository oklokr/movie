package com.movie.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PagingUtils {
    @FunctionalInterface
    public interface DataFetcher<T> {
        List<T> fetch(int size, int offset);
    }
    @FunctionalInterface
    public interface CountFetcher {
        int count();
    }

    public static <T> Map<String, Object> buildPageResponse(
        Map<String, Object> req,
        int defaultSize,
        DataFetcher<T> dataSupplier,
        CountFetcher countSupplier
    ) {
        int size = (int) req.getOrDefault("size", defaultSize);
        int page = (int) req.getOrDefault("page", 1);
        int offset = (page - 1) * size;

        List<T> list = dataSupplier.fetch(size, offset);
        int total = countSupplier.count();

        Map<String, Object> data = new HashMap<>();
        data.put("list", list);
        data.put("page", page);
        data.put("total", total);
        return data;
    }
}
