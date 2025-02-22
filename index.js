const tokenId = document.querySelector('meta[name="tokenid"]').getAttribute('content');
  const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getEquipAssetState",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "background",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "situation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "weapon",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "body",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tattoo",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "mouth",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "eyes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "clothes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "accessory",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "hat",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "mask",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "effect",
            "type": "uint256"
          }
        ],
        "internalType": "struct IEquipStorage.Equip",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }];
  import { ethers, Contract } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";
  const provider = new ethers.JsonRpcProvider(
    "https://public-en.node.kaia.io"
  );
  const equipContract = new Contract("0x3acbc08c9AD397AaB86852CF24Eb86417dD91B48", abi, provider);
  const equipState = await equipContract.getEquipAssetState(tokenId);

  let equipArray = [];
  equipState.map((data, index) => {
    const imgElement = document.getElementById(`${index}`);
    const baseImageURL = 'https://raw.githubusercontent.com/clonesneverdie/omega-image/main/base_image/'
    if (data > 0) {
      equipArray.push(String(data).slice(0, -2));
      imgElement.src = `${baseImageURL}${String(data).slice(0, -2)}.png`;
    } else {
      equipArray.push(String(data));
      imgElement.src = `${baseImageURL}${String(data)}.png`;
    }
  });

  // image base64 추출
  async function setBaseImage(id) {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = document.getElementById(id).src
      img.setAttribute('crossOrigin', '')
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
    })
  }

  // nft이미지를 한 canvas에 합성하는 함수
  async function displayImage() {
    const images = []
    for (let i = 0; i < 11; i++) {
      images.push({ src: await setBaseImage(i) })
    }
    const b64 = await mergeImages(images)
    document.getElementById('display').src = b64
  }

  displayImage()