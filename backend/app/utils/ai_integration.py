from transformers import BertModel, BertTokenizer
import torch

# Example function to generate vector using a pretrained model (BERT)
def generate_vector(text: str):
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertModel.from_pretrained('bert-base-uncased')

    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)

    # Use the last hidden state for the vector
    vector = outputs.last_hidden_state.mean(dim=1).detach().numpy()
    return vector.tolist()
