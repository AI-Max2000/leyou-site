/** 品牌、文案、真实页面截图、视频与步骤均在此替换。 */
export default {
  "brand": {
    "name": "乐游",
    "descriptor": "GAME CREATIVE WORKSPACE",
    "year": "2026"
  },
  "metadata": {
    "title": "乐游 — 从想法到游戏作品",
    "description": "为游戏创作而造。图标、游戏海报、场景、视频，从第一句描述到可以交付的作品，在一个工作台里完成。"
  },
  "motion": {
    "enabled": true,
    "ambient": true,
    "parallax": true,
    "magnetic": true,
    "spotlight": true,
    "showcase": [
      {
        "media": "crystalA",
        "flow": "icon",
        "title": "能量晶体",
        "label": "GAME ICON"
      },
      {
        "media": "forest",
        "flow": "scene",
        "title": "林间的第一束光",
        "label": "WORLD BUILDING"
      },
      {
        "media": "expedition",
        "flow": "video",
        "title": "异星远征",
        "label": "MOTION PICTURE"
      },
      {
        "media": "posterResult",
        "flow": "ad",
        "title": "踏入奇幻之境",
        "label": "GAME POSTER"
      },
      {
        "media": "mirrorLake",
        "flow": "video",
        "title": "镜湖琴声",
        "label": "MOTION PICTURE"
      }
    ]
  },
  "media": {
    "home": {
      "type": "image",
      "src": "./assets/screens/home-v2.webp",
      "alt": "乐游最新工作台首页，游戏图标、游戏海报、场景原画与视频创作入口"
    },
    "crystalA": {
      "type": "image",
      "src": "./assets/demo/crystal-a.webp",
      "alt": "项目真实生成的能量晶体图标"
    },
    "adResult": {
      "type": "image",
      "src": "./assets/demo/ad-project-result.png",
      "alt": "在项目真实排版工具中保存的奇幻冒险广告"
    },
    "forest": {
      "type": "image",
      "src": "./assets/demo/forest-project-result.png",
      "alt": "项目实际生成的森林场景原画"
    },
    "film": {
      "type": "video",
      "src": "./assets/video/fantasy-workbench-preview.mp4",
      "poster": "./assets/video/expedition-poster.webp",
      "alt": "幻想之旅 · 16 秒成片预览"
    },
    "expedition": {
      "type": "video",
      "src": "./assets/video/expedition.mp4",
      "poster": "./assets/video/expedition-poster.webp",
      "alt": "异星远征 · 视频演示"
    },
    "mirrorLake": {
      "type": "video",
      "src": "./assets/video/mirror-lake.mp4",
      "poster": "./assets/video/mirror-lake-poster.webp",
      "alt": "镜湖琴声 · 视频演示"
    },
    "deepSea": {
      "type": "video",
      "src": "./assets/video/deep-sea.mp4",
      "poster": "./assets/video/deep-sea-poster.webp",
      "alt": "深海浮光 · 视频演示"
    },
    "posterResult": {
      "type": "image",
      "src": "./assets/demo/poster-ai-result.webp",
      "alt": "项目实际生成并修改文案后的游戏海报：踏入奇幻之境",
      "position": "center 30%"
    },
    "posterVariation": {
      "type": "image",
      "src": "./assets/demo/poster-ai-variation.webp",
      "alt": "项目基于踏入奇幻之境生成的同风格新海报",
      "position": "center 30%"
    }
  },
  "nav": [
    {
      "label": "功能",
      "href": "#features"
    },
    {
      "label": "演示",
      "href": "#demos"
    }
  ],
  "hero": {
    "english": "GAME CREATIVE.",
    "heading": "把游戏里的想象，\n做成看得见的作品。",
    "description": "图标、游戏海报、场景、视频。在同一个工作台里完成。",
    "label": "A WORKSPACE FOR GAME MAKERS",
    "screen": "home"
  },
  "intro": {
    "title": "想法不必\n散落在各处。",
    "description": "参考图在这里，创作在这里，最后留下的作品也在这里。乐游把游戏内容生产的每一步，接在同一个工作台里。"
  },
  "features": [
    {
      "number": "01",
      "title": "从参考出发",
      "description": "把文字、参考图片和项目风格，放进同一次创作。"
    },
    {
      "number": "02",
      "title": "把过程留下",
      "description": "保存草稿、候选与版本，让好的方向可以继续。"
    },
    {
      "number": "03",
      "title": "带着结果离开",
      "description": "图标、图片、视频与制作清单，审核后打包交付。"
    },
    {
      "number": "04",
      "title": "用自己的模型",
      "description": "在工作台配置模型连接，按项目查看用量与预算。"
    }
  ],
  "flows": [
    {
      "id": "icon",
      "number": "01",
      "title": "一个图标，也要有自己的性格。",
      "shortTitle": "游戏图标",
      "english": "THE FIRST IMPRESSION.",
      "description": "写下构想、加入参考、比较候选。把选中的那一枚，导出成可以使用的尺寸。",
      "cover": "crystalA",
      "result": "crystalA",
      "resultTitle": "能量晶体 · 项目图标包",
      "resultMeta": [
        "5 档 PNG",
        "真实工具导出",
        "制作清单"
      ],
      "prompt": "一枚科幻游戏的能量晶体道具，蓝色发光晶体，银色金属底座，轮廓清晰，深色背景。",
      "steps": [
        {
          "title": "创作描述",
          "kind": "screen",
          "screen": "icon-0",
          "caption": "真实图标创作页：读取已保存的描述、用途、比例和模型。"
        },
        {
          "title": "参考素材",
          "kind": "screen",
          "screen": "icon-1",
          "caption": "实际参考图选择器，可从已有作品中选择素材。"
        },
        {
          "title": "生成候选",
          "kind": "screen",
          "screen": "icon-2",
          "caption": "项目中已完成的两张能量晶体图标，生成记录与原图均已保存。"
        },
        {
          "title": "大图预览",
          "kind": "screen",
          "screen": "icon-3",
          "caption": "在实际预览窗口检查原图、模型和画面描述。"
        },
        {
          "title": "尺寸导出",
          "kind": "result",
          "screen": "icon-4",
          "caption": "真实尺寸包工具，下载 1024 / 512 / 256 / 128 / 64 像素 PNG。"
        }
      ]
    },
    {
      "id": "ad",
      "number": "02",
      "title": "让游戏的亮点，占据第一眼。",
      "shortTitle": "游戏海报",
      "english": "WORTH A SECOND LOOK.",
      "description": "选定风格，让画面、艺术字与装饰一起成形。从一句文案，到整张海报，再用满意的成稿继续修改或生成同款。",
      "cover": "posterResult",
      "result": "posterResult",
      "resultTitle": "踏入奇幻之境 · 两张完整成稿",
      "resultMeta": [
        "2 张 PNG 原图",
        "1024 × 1536",
        "项目实际保存"
      ],
      "prompt": "奇幻冒险游戏海报，森林中的冒险者望向远处古堡，明亮精致的三维画风。标题「踏入奇幻之境」，宣传语「穿过森林，发现属于你的奇幻世界」。",
      "steps": [
        {
          "title": "选择风格",
          "kind": "screen",
          "screen": "poster-v2-0",
          "caption": "真实海报创作页：奇幻冒险、角色主视觉、热血战斗与活动宣传，四种方向供选择。"
        },
        {
          "title": "画面与文案",
          "kind": "screen",
          "screen": "poster-v2-1",
          "caption": "填写标题、宣传语和画面描述，选择原生 2:3 画幅，让文字与画面一起设计。"
        },
        {
          "title": "AI 海报成稿",
          "kind": "screen",
          "screen": "poster-v2-2",
          "caption": "项目已保存的「踏入奇幻之境」：金色艺术字、细节装饰与森林古堡构图融为一体。"
        },
        {
          "title": "修改与同款",
          "kind": "screen",
          "screen": "poster-v2-3",
          "caption": "从成稿带入原图、文案和生成参数，继续改文案或生成同风格的新海报。"
        },
        {
          "title": "同款新成稿",
          "kind": "screen",
          "screen": "poster-v2-5",
          "caption": "实际生成并保存的新海报，保留原作风格与标题，重新呈现画面细节。"
        },
        {
          "title": "作品入库",
          "kind": "result",
          "screen": "poster-v2-6",
          "caption": "在真实作品库按名称找到两张成稿，随时预览、下载或再次复用。"
        }
      ]
    },
    {
      "id": "scene",
      "number": "03",
      "title": "还没去过的世界，先让它被看见。",
      "shortTitle": "场景原画",
      "english": "A WORLD OF YOUR OWN.",
      "description": "让环境、建筑、光线和氛围有据可依。一个念头，逐渐长成游戏里的世界。",
      "cover": "forest",
      "result": "forest",
      "download": "./assets/demo/forest-project-result.png",
      "downloadName": "乐游-森林场景-项目原图.png",
      "resultTitle": "古老森林 · 场景原画",
      "resultMeta": [
        "1536 × 1024",
        "PNG 原图",
        "真实生成记录"
      ],
      "prompt": "巨大行星悬在异星山谷之上，远处有层叠群山与荒原，夕阳照亮地平线，电影感科幻场景。",
      "steps": [
        {
          "title": "描述环境",
          "kind": "screen",
          "screen": "scene-0",
          "caption": "真实场景原画页面：读取森林、溪流和遗迹的创作描述。"
        },
        {
          "title": "项目风格",
          "kind": "screen",
          "screen": "scene-1",
          "caption": "实际项目风格选择器，将项目的视觉设定用于创作。"
        },
        {
          "title": "检查原图",
          "kind": "screen",
          "screen": "scene-2",
          "caption": "预览项目已生成的森林场景原画。"
        },
        {
          "title": "作品入库",
          "kind": "result",
          "screen": "scene-3",
          "caption": "实际素材详情页，保留来源、版本和原始文件。"
        }
      ]
    },
    {
      "id": "video",
      "number": "04",
      "title": "让故事，一帧一帧地发生。",
      "shortTitle": "视频创作",
      "english": "MAKE A LITTLE CINEMA.",
      "description": "剧本、设定、分镜、参考、视频与后期。真实工作台里的六个阶段，配上可以播放的 AI 视频素材。",
      "cover": "home",
      "result": "film",
      "resultTitle": "幻想之旅 · 16 秒成片预览",
      "resultMeta": [
        "2 段镜头",
        "16 秒预览",
        "制作文件包"
      ],
      "prompt": "用两个镜头展开一段幻想之旅：穿过异星峡谷，在静谧的镜湖边停下脚步。",
      "steps": [
        {
          "title": "剧本",
          "kind": "screen",
          "screen": "video-0",
          "caption": "从故事开始，在真实工作台中编排两个镜头。"
        },
        {
          "title": "角色与场景",
          "kind": "screen",
          "screen": "video-1",
          "caption": "选定角色与场景设定，确定远征小队和镜湖的视觉方向。"
        },
        {
          "title": "分镜",
          "kind": "screen",
          "screen": "video-2",
          "caption": "两段 8 秒镜头，在真实分镜页设置画面与时长。"
        },
        {
          "title": "参考图",
          "kind": "screen",
          "screen": "video-3",
          "caption": "为每个镜头选定参考画面，让描述与画面对应。"
        },
        {
          "title": "视频",
          "kind": "screen",
          "screen": "video-4",
          "caption": "预览两个动态视频片段，检查人物动作与镜头运动。",
          "overlays": [
            {
              "media": "expedition",
              "start": 1,
              "x": 5.078125,
              "y": 43.7373046875,
              "width": 27.03125,
              "height": 24.328125
            },
            {
              "media": "mirrorLake",
              "start": 1,
              "x": 36.484375,
              "y": 43.7373046875,
              "width": 27.03125,
              "height": 24.328125
            }
          ]
        },
        {
          "title": "后期成片",
          "kind": "result",
          "screen": "video-5",
          "caption": "已通过本项目实际合成 16 秒预览，可播放并下载完整制作包。",
          "overlays": [
            {
              "media": "film",
              "start": 2,
              "x": 3.75,
              "y": 32.599609375,
              "width": 36.4459228515625,
              "height": 58.75
            }
          ]
        }
      ]
    },
    {
      "id": "library",
      "number": "05",
      "title": "做过的作品，也是下一次的起点。",
      "shortTitle": "素材与版本",
      "english": "NOTHING GETS LOST.",
      "description": "按项目整理创作，保留每次版本。找到、预览、复用，让好素材持续有用。",
      "cover": "home",
      "result": "posterVariation",
      "download": "./assets/demo/poster-ai-variation.png",
      "downloadName": "乐游-踏入奇幻之境-同款海报原图.png",
      "resultTitle": "作品库中的同款新海报",
      "resultMeta": [
        "1024 × 1536",
        "PNG 原图",
        "版本已保存"
      ],
      "prompt": "把图标、游戏海报与场景放在一起，整理成下一轮创作的参考素材。",
      "steps": [
        {
          "title": "查找作品",
          "kind": "screen",
          "screen": "library-v2-0",
          "caption": "在真实作品库搜索「踏入奇幻之境」，集中查看已保存的两张海报。"
        },
        {
          "title": "按类型筛选",
          "kind": "screen",
          "screen": "library-v2-1",
          "caption": "保留作品名称搜索，再按图片类型筛选，找到需要的成稿。"
        },
        {
          "title": "查看版本",
          "kind": "screen",
          "screen": "library-v2-2",
          "caption": "新海报的实际素材详情，保留当前版本、来源与原始文件。"
        },
        {
          "title": "预览与下载",
          "kind": "result",
          "screen": "library-v2-3",
          "caption": "在真实预览窗口检查完整构图，并下载 1024 × 1536 的 PNG 原图。"
        }
      ]
    },
    {
      "id": "delivery",
      "number": "06",
      "title": "交出去的，就是确认过的那一版。",
      "shortTitle": "审核与交付",
      "english": "READY TO LEAVE THE STUDIO.",
      "description": "按版本审核，确认文件与清单。一次清楚的交接，让创作有一个可靠的落点。",
      "cover": "home",
      "result": "adResult",
      "resultTitle": "项目已有正式交付包",
      "resultMeta": [
        "交付 #3",
        "导出 #2",
        "文件与校验清单"
      ],
      "prompt": "确认本次素材版本、画幅和使用说明，生成一份清晰的交付包。",
      "steps": [
        {
          "title": "创意版本",
          "kind": "screen",
          "screen": "delivery-0",
          "caption": "实际创意详情页，检查保存的需求和所选素材。"
        },
        {
          "title": "素材审核",
          "kind": "screen",
          "screen": "delivery-1",
          "caption": "展示项目内已有的已批准广告素材版本。"
        },
        {
          "title": "交付检查",
          "kind": "screen",
          "screen": "delivery-2",
          "caption": "真实审核交付页面，核对具体创意版本与输入素材。"
        },
        {
          "title": "正式文件包",
          "kind": "result",
          "screen": "delivery-3",
          "caption": "已有的正式交付记录，文件包包含制作清单和校验信息。"
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "展示的是乐游实际页面吗？",
      "answer": "是。界面均采集自当前项目的真实页面，保留原有布局和内容。点击流程步骤可以查看不同状态，结果文件来自项目实际保存或导出的资源。"
    },
    {
      "question": "游戏海报的两种创作方式有什么区别？",
      "answer": "AI 整张海报同时设计画面与文字，支持四种风格；可带入原海报修改文案或生成同款，文字准确性需人工检查。本站海报演示展示这种方式的实际成稿。模板排版仍可用于无字画面，支持独立调整文字与 Logo，并导出 PNG / JPEG。"
    },
    {
      "question": "视频可以直接播放吗？",
      "answer": "可以。视频片段和流程中的成片均可直接播放，支持暂停、拖动进度和全屏查看。"
    }
  ],
  "capture": {
    "width": 1280,
    "height": 800,
    "date": "2026-09-30",
    "updates": {
      "gamePoster": "2026-10-02",
      "home": "2026-10-02",
      "library": "2026-10-02",
      "brand": "2026-10-08"
    }
  },
  "videoSamples": {
    "title": "让想象，动起来。",
    "items": [
      {
        "media": "expedition",
        "title": "异星远征",
        "duration": "8 秒"
      },
      {
        "media": "mirrorLake",
        "title": "镜湖琴声",
        "duration": "8 秒"
      },
      {
        "media": "deepSea",
        "title": "深海浮光",
        "duration": "5.9 秒"
      }
    ]
  }
};
