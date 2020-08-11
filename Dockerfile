FROM openjdk:8-jdk

COPY ./back /back
WORKDIR /back

CMD ["./gradlew", "bootRun"]