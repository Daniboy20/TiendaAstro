import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password || !firstName) {
      return new Response("Email, password and first name are required", {
        status: 400,
      });
    }

    const demoCustomer = {
      id: "demo-customer",
      firstName,
      email,
    };

    const token = "demo-token";

    const response = new Response(
      JSON.stringify({
        customer: demoCustomer,
        token,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    response.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; SameSite=Lax`
    );

    return response;
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        errors: [
          {
            code: "INTERNAL_ERROR",
            message: error.message || "An unknown error occurred",
          },
        ],
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};