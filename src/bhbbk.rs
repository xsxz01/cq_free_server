use serde::Deserialize;

/**
 * {
            "_id": "66c72cffe03c4fdd1c23dc9b",
            "bbkName": "独家九龙抬棺专属神器无限刀单职业版-带假人-自动回收-ESP插件",
            "bbkLineHeight": "#606266",
            "bbkFontWeight": "normal",
            "bbkShowWeb": "http://sf302.cn:88/24/465/",
            "bbkScreenshots": "http://www.bhbbk.com/show.html?uniqueid=e1bcda54-588e-43b6-9ae8-d5b1833561c2",
            "bbkUpdated": "2024-08-23",
            "bbkEngine": "GOM",
            "bbkType": "单职业",
            "bbkHots": "hot",
            "bbkBuyLink": "https://fk.54688.cn/details/87A5C54506DEA86C|http://mi.gooyun.top/product/AF30E20AFFA8D21C",
            "bbSize": "202.88",
            "bdSize": "6.35",
            "editTime": "20240823202022",
            "uniqueid": "e1bcda54-588e-43b6-9ae8-d5b1833561c2",
            "__v": 0
        }
 */

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct BhbbkItem {
    #[serde(rename = "_id")]
    pub _id: String,
    pub bbk_name: String,
    pub bbk_line_height: String,
    pub bbk_font_weight: String,
    pub bbk_show_web: String,
    pub bbk_screenshots: String,
    pub bbk_updated: String,
    pub bbk_engine: String,
    pub bbk_type: String,
    pub bbk_hots: String,
    pub bbk_buy_link: String,
    #[serde(default)]
    pub bb_size: String,
    #[serde(default)]
    pub bd_size: String,
    pub edit_time: String,
    pub uniqueid: String,
    #[serde(rename(deserialize = "__v"))]
    #[serde(default)]
    pub _v: i32,
}

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all(deserialize = "camelCase"))]
pub struct BhbbkResponse {
    pub is_ok: bool,
    pub total: i32,
    pub data: Vec<BhbbkItem>,
}

pub async fn get_bhbbk_data(page: u32, size: u32) -> Result<BhbbkResponse, Box<dyn std::error::Error>> {
    let request_url = format!("http://115.231.220.202:3000/bbkApi/bbkdata?currentPage={}&pagesize={}&search=", page, size);
    let client = reqwest::Client::new();
    let resp = client.get(request_url).send().await?;
    let response_text = resp.text().await?;
    let json: BhbbkResponse = serde_json::from_str(response_text.as_str()).unwrap();
    Ok(json)
}