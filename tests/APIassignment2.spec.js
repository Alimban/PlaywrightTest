const { test, expect, request } = require("@playwright/test")

const BASE_URL = "https://eventhub.rahulshettyacademy.com";

const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = { email: 'batman@yahoo.com', password: 'batman123' };
const GMAIL_USER = { email: 'superman@gmail.com', password: 'superman123' };

test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page }) => {

    // ── Step 1: Login as Yahoo user via API and get token

    const apiContext = await request.newContext();

    const loginResponse = await apiContext.post("${API_URL}/auth/login",
        {
            body: { email: YAHOO_USER.email, password: YAHOO_USER.password },
        });

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();

    const token = loginResponseJson.token;

    //Step 2 — Fetch events via API to get a valid event ID

    const eventResponse = await apiContext.get("${API_URL}/events",
        {
            Headers: {Authorization: 'Bearer token'},
        });

        expect(eventResponse.ok()).toBeTruthy();

        const eventResponseJson = await eventResponse.json();

        const eventId = eventResponseJson.data[0].id;




})

