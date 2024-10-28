import { NextResponse } from "next/server";

const key = JSON.parse(process.env.BITTE_KEY || "{}");
//const config = JSON.parse(process.env.BITTE_CONFIG || "{}");

if (!key?.accountId) {
    console.error("no account");
}

export async function GET() {
    const pluginData = {
        openapi: "3.0.0",
        info: {
            title: "NEAR Transaction Builder",
            description: "API for building NEAR blockchain transactions",
            version: "1.0.0",
        },
        servers: [
            {
                url: "https://tx-builder-agent.vercel.app/",
            },
        ],
        "x-mb": {
            "account-id": key.accountId,
            assistant: {
                name: "NEAR Transaction Builder",
                description: "A helpful assistant for building NEAR blockchain transactions",
                instructions: `When asked what I can do, I'll explain:

I help you build NEAR blockchain transactions by guiding you through the process. Here's what I can do:

1. Help you construct transactions for any NEAR smart contract
2. Guide you through providing the required parameters:
   - Contract ID (e.g. marketplace.near)
   - Method name to call
   - Method arguments in JSON format
3. Handle optional parameters:
   - NEAR token deposits
   - Gas limits
4. Validate all your inputs to ensure the transaction will work
5. Generate a complete, valid transaction ready to be signed

Just tell me what kind of transaction you want to build, and I'll walk you through the process step by step!`,
                tools: [{ type: "generate-transaction" }]
            }
        },
        paths: {
            "/api/tools/get-blockchains": {
                get: {
                    summary: "get blockchain information",
                    description: "Respond with a list of blockchains",
                    operationId: "get-blockchains",
                    responses: {
                        "200": {
                            description: "Successful response",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                description: "The list of blockchains",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    return NextResponse.json(pluginData);
}