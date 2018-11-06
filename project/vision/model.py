from pathlib import Path
import dlib
import numpy as np
import argparse
from .wide_resnet import WideResNet
from keras.utils.data_utils import get_file

from PIL import Image, ImageDraw, ImageFont

pretrained_model = "https://github.com/yu4u/age-gender-estimation/releases/download/v0.5/weights.28-3.73.hdf5"
modhash = 'fbe63257a054c1c5466cfd7bf14646d6'


class Model:
    IMG_SIZE = 64
    MARGIN = .1

    def __init__(self):
        self.weight_file = get_file("weights.28-3.73.hdf5", pretrained_model, cache_subdir="pretrained_models",
                                    file_hash=modhash, cache_dir=Path(__file__).resolve().parent)
        self.detector = dlib.get_frontal_face_detector()

        self.model = WideResNet(self.IMG_SIZE, depth=16, k=8)()
        self.model.load_weights(self.weight_file)

    # def draw_label(self, image, point, label, font=cv2.FONT_HERSHEY_SIMPLEX,
    #                font_scale=0.8, thickness=1):
    #     size = cv2.getTextSize(label, font, font_scale, thickness)[0]
    #     x, y = point
    #     cv2.rectangle(image, (x, y - size[1]), (x + size[0], y), (255, 0, 0), cv2.FILLED)
    #     cv2.putText(image, label, point, font, font_scale, (255, 255, 255), thickness, lineType=cv2.LINE_AA)

    def predict(self, img):
        img_w, img_h = img.size
        detected = self.detector(np.array(img), 1)
        faces = np.empty((len(detected), self.IMG_SIZE, self.IMG_SIZE, 3))
        print('Faces detected: ', len(detected))
        if len(detected) > 0:
            for i, d in enumerate(detected):
                x1, y1, x2, y2, w, h = d.left(), d.top(), d.right() + 1, d.bottom() + 1, d.width(), d.height()
                xw1 = max(int(x1 - self.MARGIN * w), 0)
                yw1 = max(int(y1 - self.MARGIN * h), 0)
                xw2 = min(int(x2 + self.MARGIN * w), img_w - 1)
                yw2 = min(int(y2 + self.MARGIN * h), img_h - 1)

                draw = ImageDraw.Draw(img)
                draw.rectangle((xw1, yw1, xw2 + 1, yw2 + 1), outline='red')
                # draw.text((20, 70), "something123", font=ImageFont.truetype("font_path123"))

                cimg = img.crop((xw1, yw1, xw2 + 1, yw2 + 1))
                faces[i, :, :, :] = cimg.resize((self.IMG_SIZE, self.IMG_SIZE), Image.ANTIALIAS)

            # predict ages and genders of the detected faces
            results = self.model.predict(faces)
            predicted_genders = results[0]
            ages = np.arange(0, 101).reshape(101, 1)
            predicted_ages = results[1].dot(ages).flatten()

            # draw results
            for i, d in enumerate(detected):
                label = "{}yo, {}".format(int(predicted_ages[i]),
                                        "Female" if predicted_genders[i][0] > 0.5 else "Male")
                draw = ImageDraw.Draw(img)
                draw.text((d.left() - 40, d.top() - 80), label, font=ImageFont.truetype("Arial", size=30), fill='red')
            return img
            # self.draw_label(img, (d.left(), d.top()), label)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Prediction age by face on image')
    parser.add_argument('image', help='Path to image')
    args = parser.parse_args()

    model = Model()
    im = Image.open(args.image)
    model.predict(im).show()
