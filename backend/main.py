
# ---------------- OFFLINE KRUSHI AI ----------------

@app.post("/ai/chat")
def ai_chat(request: AIChatRequest):

    message = request.message.strip()

    if not message:
        raise HTTPException(status_code=400, detail="Please enter a message.")

    text = message.lower()

    # Detect Kannada input
    has_kannada = any("\u0c80" <= char <= "\u0cff" for char in message)

    # Kannada responses based on question topic
    if has_kannada:
        if any(word in message for word in ["ನಮಸ್ಕಾರ", "ಹಲೋ", "ಹಾಯ್"]):
            reply = "ನಮಸ್ಕಾರ ರೈತರೇ! ಕೃಷಿ ಸಹಾಯಕ್ಕೆ ಸ್ವಾಗತ. ಯಾವ ಬೆಳೆ ಅಥವಾ ಕೃಷಿ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಲು ಬಯಸುತ್ತೀರಿ?"

        elif any(word in message for word in ["ಮಣ್ಣು", "ಕೆಂಪು ಮಣ್ಣು", "ಕಪ್ಪು ಮಣ್ಣು"]):
            reply = "ಮಣ್ಣಿನ ಪ್ರಕಾರಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಬೆಳೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು. ಕೆಂಪು ಮಣ್ಣಿನಲ್ಲಿ ರಾಗಿ ಮತ್ತು ಕಡಲೆಕಾಯಿ ಬೆಳೆಯಬಹುದು. ಕಪ್ಪು ಮಣ್ಣಿನಲ್ಲಿ ಹತ್ತಿ ಮತ್ತು ಜೋಳ ಸೂಕ್ತವಾಗಬಹುದು. ನಿಮ್ಮ ಮಣ್ಣಿನ ಪ್ರಕಾರ ಯಾವುದು?"

        elif any(word in message for word in ["ರಾಗಿ"]):
            reply = "ರಾಗಿ ಮಳೆಯಾಶ್ರಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಬೆಳೆಯಬಹುದಾದ ಪ್ರಮುಖ ಬೆಳೆಯಾಗಿದೆ. ಬಿತ್ತನೆ ಸಮಯ ಮತ್ತು ನೀರಿನ ಲಭ್ಯತೆ ಮುಖ್ಯ. ನೀವು ಯಾವ ಜಿಲ್ಲೆಯಲ್ಲಿ ರಾಗಿ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ?"

        elif any(word in message for word in ["ನೀರು", "ನೀರಾವರಿ", "ಹನಿ ನೀರಾವರಿ"]):
            reply = "ಬೆಳೆಯ ಹಂತ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಗಮನಿಸಿ ನೀರು ಹಾಕಿ. ಅತಿಯಾದ ನೀರಾವರಿಯನ್ನು ತಪ್ಪಿಸಿ. ಹನಿ ನೀರಾವರಿ ನೀರನ್ನು ಉಳಿಸಲು ಸಹಾಯ ಮಾಡಬಹುದು."

        elif any(word in message for word in ["ಗೊಬ್ಬರ", "ಸಾವಯವ", "ಕಂಪೋಸ್ಟ್"]):
            reply = "ಯಾವ ಗೊಬ್ಬರ ಬಳಸಬೇಕು ಎಂಬುದು ಬೆಳೆ ಮತ್ತು ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿದೆ. ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಆಧಾರದ ಮೇಲೆ ಗೊಬ್ಬರ ಬಳಸಿ. ನೀವು ಯಾವ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ?"

        elif any(word in message for word in ["ಕೀಟ", "ರೋಗ", "ಹುಳು"]):
            reply = "ಬೆಳೆಯ ಎಲೆಗಳು ಮತ್ತು ಕಾಂಡದಲ್ಲಿರುವ ಲಕ್ಷಣಗಳನ್ನು ಮೊದಲು ಗಮನಿಸಿ. ಕೀಟ ಅಥವಾ ರೋಗವನ್ನು ಸರಿಯಾಗಿ ಗುರುತಿಸಿದ ನಂತರವೇ ಚಿಕಿತ್ಸೆ ಆಯ್ಕೆಮಾಡಿ. ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ."

        elif any(word in message for word in ["ಬೆಲೆ", "ಮಾರುಕಟ್ಟೆ", "ಮಂಡಿ"]):
            reply = "ನನ್ನಲ್ಲಿ ಈಗಿನ ನೇರ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಲಭ್ಯವಿಲ್ಲ. ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಸ್ಥಳೀಯ ಎಪಿಎಂಸಿ ಅಥವಾ ಅಧಿಕೃತ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಮೂಲದಲ್ಲಿ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ."

        elif any(word in message for word in ["ಮಳೆ", "ಹವಾಮಾನ"]):
            reply = "ನನ್ನಲ್ಲಿ ನೇರ ಹವಾಮಾನ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ. ನೀರಾವರಿ ಅಥವಾ ಕೊಯ್ಲು ನಿರ್ಧಾರ ಮಾಡುವ ಮೊದಲು ಅಧಿಕೃತ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಪರಿಶೀಲಿಸಿ."

        else:
            reply = "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಸ್ವಲ್ಪ ವಿವರವಾಗಿ ತಿಳಿಸಿ. ಯಾವ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ? ಮಣ್ಣಿನ ಪ್ರಕಾರ ಯಾವುದು? ನಿಮಗೆ ಯಾವ ಸಮಸ್ಯೆ ಇದೆ? ನಾನು ಕೃಷಿ ಸಂಬಂಧಿತ ಸಾಮಾನ್ಯ ಮಾಹಿತಿ ನೀಡುತ್ತೇನೆ."

        return {
            "reply": reply,
            "language": "Kannada",
            "mode": "offline_fallback"
        }

    # English responses
    if any(word in text for word in ["hello", "hi", "hey", "namaste"]):
        reply = "Hello! Welcome to Krushi-Route. What are you growing on your farm? I can help with crop selection, irrigation, soil and common farming problems."

    elif any(word in text for word in ["red soil", "red earth"]):
        reply = "Red soil can support crops such as ragi, groundnut and millets, depending on rainfall and local conditions. A soil test helps with crop selection. Which district are you farming in?"

    elif any(word in text for word in ["black soil", "black earth"]):
        reply = "Black soil can support crops such as cotton, sorghum and pulses. Drainage and rainfall are important. What crop are you planning to grow?"

    elif any(word in text for word in ["ragi", "finger millet"]):
        reply = "Ragi is suitable for several rainfed farming areas. Its success depends on soil, rainfall and sowing time. Are you planning to grow it this season?"

    elif any(word in text for word in ["tomato", "tomatoes"]):
        reply = "Tomato cultivation needs suitable drainage, regular moisture and monitoring for pests and diseases. Are you asking about growing tomatoes, leaf problems or market prices?"

    elif any(word in text for word in ["irrigation", "watering", "water requirement", "drip"]):
        reply = "Irrigation depends on the crop, soil moisture and growth stage. Avoid overwatering. Drip irrigation may help save water. Which crop are you growing?"

    elif any(word in text for word in ["fertilizer", "manure", "compost", "nutrient"]):
        reply = "Fertilizer requirements depend on the crop and soil nutrient levels. A soil test is the best starting point. Which crop and soil type do you have?"

    elif any(word in text for word in ["pest", "insect", "disease", "leaves", "yellow leaves"]):
        reply = "Let's understand the problem first. Which crop is affected, and what changes are you noticing on its leaves or stems? Correct identification is important before choosing a treatment."

    elif any(word in text for word in ["price", "market rate", "mandi"]):
        reply = "I don't have live market-price access in offline mode. Please check your local APMC market or an official agricultural price source before selling."

    elif any(word in text for word in ["weather", "rainfall", "rain"]):
        reply = "I cannot access live weather information in offline mode. Check an official forecast before planning irrigation or harvesting."

    elif any(word in text for word in ["thank", "thanks"]):
        reply = "You're welcome! Feel free to ask another farming question."

    else:
        reply = "I can help you with crop selection, soil, irrigation, fertilizers and common crop problems. Tell me your crop name and describe what you want to know."

    return {
        "reply": reply,
        "language": "English",
        "mode": "offline_fallback"
    }
