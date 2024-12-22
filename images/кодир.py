import base64
from PIL import Image
from io import BytesIO

def image_to_base64(image_path):
    """Преобразует изображение в строку Base64."""
    with open(image_path, "rb") as img_file:
        base64_str = base64.b64encode(img_file.read()).decode("utf-8")
    return base64_str

def base64_to_image(base64_str, output_path):
    """Восстанавливает изображение из строки Base64."""
    image_data = base64.b64decode(base64_str)
    with open(output_path, "wb") as output_file:
        output_file.write(image_data)

# Пример использования
image_path = "IMG_9150.JPG"  # Замените на свой файл
output_path = "restored_image.jpg"

# Преобразование изображения в текст
base64_str = image_to_base64(image_path)
print("Base64 строка:")
print(base64_str)
print(len(base64_str))

# Восстановление изображения из текста
base64_to_image(base64_str, output_path)
# print(f"Восстановленное изображение сохранено как {output_path}")










