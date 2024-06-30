export function GET() {
  const searchParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,user:email",
  }).toString();

  return Response.redirect(`https://github.com/login/oauth/authorize?${searchParams}
`);
}
