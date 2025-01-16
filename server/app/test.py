import openai

# Set your API key
openai.api_key = "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"
# import openai

# # Set your OpenAI API key
# openai.api_key = "your-api-key-here"

# Fetch the list of available models
models = openai.Model.list()

# Print the IDs of the available models
print("Available models:")
for model in models['data']:
    print(model['id'])

# # Create a chat completion
completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Write a haiku about recursion in programming."
        }
    ]
)

# Print the response
print(completion.choices[0].message["content"])
