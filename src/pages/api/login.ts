export const POST = async ({ request }: { request: Request }) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          errors: [{ message: "Email and password are required." }],
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const demoUser = {
      id: "demo-user",
      firstName: "Demo",
      lastName: "User",
      email,
      token: "demo-token",
    };

    const response = new Response(JSON.stringify(demoUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    response.headers.set(
      "Set-Cookie",
      "token=demo-token; Path=/; SameSite=Lax"
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