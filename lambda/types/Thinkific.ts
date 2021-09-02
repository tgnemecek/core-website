// https://developers.thinkific.com/api/api-documentation/#/Products/getProducts
export type ThinkificProduct = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  card_image_url?: string;
  status: "published" | "draft";
  hidden: boolean;

  // Unused:
  // created_at: string;
  // productable_id: string;
  // productable_type: string;
  // /**
  //  * @deprecated The method should not be used
  //  */
  // price: number;
  // position: number;
  // private: boolean;
  // subscription: boolean;
  // days_until_expiry: number;
  // has_certificate: boolean;
  // keywords: string;
  // seo_title: string;
  // seo_description: string;
  // collection_ids: number[];
  // related_product_ids: number[];

  // product_prices: {
  //   id: number;
  //   is_primary: boolean;
  //   payment_type: "free" | "one-time" | "subscription" | "payment-plan";
  //   label: string;
  //   price: string;
  //   days_until_expiry: number;
  //   pay_button_text: string;
  //   number_of_payments: number;
  //   interval: string;
  //   interval_count: string;
  //   trial_interval: string;
  //   trial_interval_count: string;
  //   custom_first_price: string;
  //   price_name: string;
  //   currency: string;
  // }[];
};

export type Course = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
};
