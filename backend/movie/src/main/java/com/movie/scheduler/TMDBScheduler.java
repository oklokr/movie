package com.movie.scheduler;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class TMDBScheduler {

    private final MovieBatchService movieBatchService;

    @PostConstruct
    public void runOnStartup() {
        System.out.println("서버 시작 시 배치 실행 - System.out");
        log.info("서버 시작 시 배치 실행");
        movieBatchService.updateMovies();
    }

    @Scheduled(cron = "${schedule.movie-fetch}")
    public void scheduledMovieUpdate() {
        log.info("스케줄러에 의한 배치 실행");
        movieBatchService.updateMovies();
    }
}