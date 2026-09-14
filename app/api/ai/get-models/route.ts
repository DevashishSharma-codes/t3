import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/models", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            return NextResponse.json({ message: "Error while getting models" }, { status: 500 });
        }
        const data = await response.json();
        const freeModels = data.data.filter((model: any) => {
            const promptPrice = parseFloat(model.pricing?.prompt || model.pricing?.prompt_price || "0");
            const completionPrice = parseFloat(model.pricing?.completion || model.pricing?.completion_price || "0");
            return promptPrice === 0 && completionPrice === 0;
        });
        const formattedModels = freeModels.map((model: any) => ({
            id: model.id,
            name: model.name,
            description: model.description,
            is_open_source: model.is_open_source,
            architecture: model.architecture,
            context_window: model.context_window,
            token_limit: model.token_limit,
        }));
        return NextResponse.json({ models: formattedModels }, { status: 200 });
    } catch (error) {
        console.error("Error while getting models", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
