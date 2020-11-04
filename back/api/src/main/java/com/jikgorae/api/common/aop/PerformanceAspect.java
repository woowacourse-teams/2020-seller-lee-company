package com.jikgorae.api.common.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Component
@Aspect
public class PerformanceAspect {
    private static final Logger logger = LoggerFactory.getLogger(PerformanceAspect.class);

    @Around("execution(* *..*Dao.*(..)) || (bean(*Service) && !within(com.jikgorae.api.security..*)))")
    public Object checkPerformance(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        String methodName = pjp.getSignature().getName();

        stopWatch.start();
        Object proceed = pjp.proceed();
        stopWatch.stop();
        logger.info("Perform : " + methodName + " " + stopWatch.getTotalTimeNanos() + "ns");
        return proceed;
    }
}
