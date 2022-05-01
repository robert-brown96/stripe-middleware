export async function handler(event) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: `INVALID PATH ACCESSED ${event.requestContext.time}.`
    };
}
