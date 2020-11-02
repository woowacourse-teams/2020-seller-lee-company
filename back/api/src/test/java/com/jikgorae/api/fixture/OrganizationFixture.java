package com.jikgorae.api.fixture;

import com.jikgorae.api.organization.application.OrganizationRequest;
import com.jikgorae.api.organization.application.OrganizationResponse;
import com.jikgorae.api.organization.domain.Organization;

public class OrganizationFixture {
    public static final String 직고래_NAME = "직고래";
    public static final String 우아한테크코스_NAME = "우아한테크코스";
    public static final String 한성대학교_NAME = "한성대학교";
    public static final String 배달의민족_NAME = "배달의민족";
    public static final String 비마트_NAME = "비마트";
    public static final String 중앙대학교_NAME = "중앙대학교";
    public static final String 송이_NAME = "송이";

    public static final OrganizationRequest 직고래_요청 = new OrganizationRequest(
            직고래_NAME);
    public static final OrganizationRequest 우아한테크코스_요청 = new OrganizationRequest(
            우아한테크코스_NAME);
    public static final OrganizationRequest 한성대학교_요청 = new OrganizationRequest(
            한성대학교_NAME);
    public static final OrganizationRequest 배달의민족_요청 = new OrganizationRequest(
            배달의민족_NAME);
    public static final OrganizationRequest 비마트_요청 = new OrganizationRequest(
            비마트_NAME);
    public static final OrganizationRequest 중앙대학교_요청 = new OrganizationRequest(
            중앙대학교_NAME);
    public static final OrganizationRequest 송이_요청 = new OrganizationRequest(
            송이_NAME);
    public static final Organization 직고래 = new Organization(51L, 직고래_NAME,
            "423502");
    public static final Organization 우아한테크코스 = new Organization(52L, 우아한테크코스_NAME, "124838");

    public static final Organization 한성대학교 = new Organization(53L, 한성대학교_NAME, "012345");

    public static final Organization 배달의민족 = new Organization(54L, 배달의민족_NAME,
            "112121");
    public static final Organization 송이 = new Organization(55L, 송이_NAME,
            "102021");
    public static final OrganizationResponse 직고래_응답 = OrganizationResponse.of(
            직고래);

    public static final OrganizationResponse 우아한테크코스_응답 = OrganizationResponse.of(
            우아한테크코스);

    public static final OrganizationResponse 송이_응답 = OrganizationResponse.of(
            송이);

}
