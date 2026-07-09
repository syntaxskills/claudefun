import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  getRedirectUrl,
  getRewrittenUrl,
  isRewrite,
  unstable_doesMiddlewareMatch,
} from "next/experimental/testing/server";
import { NextRequest } from "next/server";
import proxy, { config } from "./proxy";

const origin = "https://claudefun.syntaxskills.com";

function request(path: string, headers?: HeadersInit) {
  return new NextRequest(new URL(path, origin), { headers });
}

describe("i18n proxy", () => {
  test("rewrites the default slash route to the default locale", async () => {
    const response = await proxy(request("/", { "accept-language": "zh" }));

    assert.equal(isRewrite(response), true);
    assert.equal(getRewrittenUrl(response), `${origin}/en`);
    assert.equal(getRedirectUrl(response), null);
  });

  test("keeps explicit zh requests on the zh route", async () => {
    const response = await proxy(request("/zh"));

    assert.equal(getRedirectUrl(response), null);
    assert.equal(getRewrittenUrl(response), null);
  });

  test("matches pages and excludes static assets", () => {
    assert.equal(unstable_doesMiddlewareMatch({ config, url: "/" }), true);
    assert.equal(unstable_doesMiddlewareMatch({ config, url: "/zh" }), true);
    assert.equal(unstable_doesMiddlewareMatch({ config, url: "/_next/static/chunk.js" }), false);
    assert.equal(unstable_doesMiddlewareMatch({ config, url: "/favicon.ico" }), false);
  });
});
