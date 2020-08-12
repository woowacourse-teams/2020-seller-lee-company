FROM openjdk:8-alpine

COPY ./back /back
WORKDIR /back

CMD ["./gradlew", "bootRun"]