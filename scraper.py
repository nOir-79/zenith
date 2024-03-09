import requests


def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                f.write(response.content)
            print("Image downloaded successfully!")
        else:
            print("Failed to download image. Status code:", response.status_code)
    except Exception as e:
        print("Error occurred while downloading image:", e)

# Example usage:
url = 'https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/25208120/2023/9/26/0a21665f-e7f2-401a-ae47-4903cf1c5ebe1695720756900-CMF-by-Nothing-Watch-Pro-8711695720756698-1.jpg'  # Replace with your image URL
filename = 'image.jpg'  # File name to save the image
download_image(url, filename)
