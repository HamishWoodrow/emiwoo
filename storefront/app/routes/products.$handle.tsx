import type {Route} from './+types/products.$handle';
import {useLoaderData} from 'react-router';
import {
  getAdjacentAndFirstAvailableVariants,
  getProductOptions,
  getSelectedProductOptions,
  useOptimisticVariant,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {Money} from '@shopify/hydrogen-react';
import {Button} from '~/components/ui/Button';
import {ParallaxSection} from '~/components/ui/ParallaxSection';
import {ProductForm} from '~/components/ProductForm';
import {PRODUCT_QUERY} from '~/graphql/product';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => [
  {
    title:
      data?.product?.title
        ? `${data.product.title} — Emi Woo`
        : 'Product — Emi Woo',
  },
  {
    name: 'description',
    content: data?.product?.seo?.description ?? '',
  },
];

export async function loader({request, context, params}: Route.LoaderArgs) {
  const handle = params.handle;
  if (!handle) throw new Response('Not found', {status: 404});

  const {storefront} = context;
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions: getSelectedProductOptions(request),
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  if (!product?.id) throw new Response(null, {status: 404});
  redirectIfHandleIsLocalized(request, {handle, data: product});
  return {product};
}

const STYLING_EXAMPLES = [
  {
    image: '/images/placeholders/styling-1.jpg',
    caption: 'With tailored trousers and minimal loafers for the office.',
  },
  {
    image: '/images/placeholders/styling-2.jpg',
    caption: 'Tucked into a midi skirt for an effortless evening look.',
  },
  {
    image: '/images/placeholders/styling-3.jpg',
    caption: 'Open, over a slip dress or swimwear, by the water.',
  },
];

const MATERIAL_DETAILS = [
  {label: 'Fabric', value: '100% Mulberry Silk'},
  {label: 'Weight', value: '16mm — substantive but never heavy'},
  {label: 'Provenance', value: 'Woven in Como, Italy'},
  {label: 'Weave', value: 'Charmeuse — satin-faced, fluid drape'},
  {label: 'Colourway', value: 'Ivory, Noir, Champagne (seasonal)'},
  {label: 'Care', value: 'Hand wash cold or dry clean'},
];

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );
  useSelectedOptionInUrlParam(selectedVariant?.selectedOptions);
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const heroSrc =
    selectedVariant?.image?.url ?? '/images/placeholders/product-hero.jpg';
  const heroAlt =
    selectedVariant?.image?.altText ?? product.title;
  const heroW = selectedVariant?.image?.width ?? 1600;
  const heroH = selectedVariant?.image?.height ?? 2000;

  return (
    <>
      {/* ================================
          1. Product Hero
      ================================ */}
      <section
        style={{
          paddingTop: '72px',
          background: 'var(--color-bg)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            minHeight: 'calc(100svh - 72px)',
          }}
        >
          {/* Product image */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--color-surface)',
              minHeight: '60vw',
            }}
          >
            <img
              src={heroSrc}
              alt={heroAlt}
              width={heroW}
              height={heroH}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          </div>

          {/* Product info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 72px)',
              gap: '32px',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '16px',
                }}
              >
                Emi Woo
              </span>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.1,
                }}
              >
                {product.title}
              </h1>
              {selectedVariant?.price && (
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    fontWeight: 300,
                    color: 'var(--color-cta)',
                    marginTop: '12px',
                  }}
                >
                  <Money data={selectedVariant.price} />
                </p>
              )}
            </div>

            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--color-border)',
              }}
            />

            <div className="pdp-product-form">
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </div>

            {/* Product brief */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'var(--color-text-secondary)',
              }}
            >
              {product.description
                ? product.description
                : '100% Mulberry silk, cut from a single length of charmeuse woven in Como, Italy.'}
            </p>

            {/* Shipping note */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '0.06em',
                color: 'var(--color-text-secondary)',
                borderTop: '1px solid var(--color-border)',
                paddingTop: '20px',
              }}
            >
              Free express delivery worldwide. Easy returns within 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* ================================
          2. The Story
      ================================ */}
      <ParallaxSection
        image="/images/placeholders/story-image.jpg"
        overlay={0.5}
        ariaLabel="The Story"
      >
        <div className="container" style={{width: '100%'}}>
          <div
            style={{
              maxWidth: '560px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              The Story
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.5vw, 60px)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
              }}
            >
              Three years<br />in the making.
            </h2>
            <div
              style={{width: '40px', height: '1px', background: 'var(--color-accent)'}}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1.4vw, 15px)',
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'rgba(244,237,228,0.72)',
                maxWidth: '400px',
              }}
            >
              Forty patterns. Six mills visited. One blouse. We weren't finished
              until there was nothing left to remove and nothing missing.
            </p>
          </div>
        </div>
      </ParallaxSection>

      {/* ================================
          3. Material & Craft
      ================================ */}
      <section
        style={{
          background: 'var(--color-surface)',
          padding: 'clamp(80px, 10vw, 140px) var(--container-pad)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: 'clamp(48px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '9px',
                  fontWeight: 400,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: '20px',
                }}
              >
                Material & Craft
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '24px',
                }}
              >
                Every detail<br />has a reason.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: 'var(--color-text-secondary)',
                  maxWidth: '400px',
                }}
              >
                We chose charmeuse specifically for its satin face and fluid drape.
                The 16mm weight means it holds its shape through a full day while
                remaining cool enough for summer and layerable enough for winter.
              </p>
            </div>

            {/* Material specs */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0'}}>
              {MATERIAL_DETAILS.map(({label, value}) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--color-border)',
                    gap: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 400,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                      minWidth: '100px',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 300,
                      color: 'var(--color-text-primary)',
                      textAlign: 'right',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          4. How to Wear It
      ================================ */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: 'clamp(80px, 10vw, 140px) var(--container-pad)',
        }}
      >
        <div className="container">
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '16px',
            }}
          >
            Styling
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              marginBottom: '56px',
              fontStyle: 'italic',
            }}
          >
            How to wear it
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(24px, 3vw, 40px)',
            }}
          >
            {STYLING_EXAMPLES.map(({image, caption}, i) => (
              <div key={i} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div
                  style={{
                    aspectRatio: '3 / 4',
                    overflow: 'hidden',
                    background: 'var(--color-surface)',
                  }}
                >
                  <img
                    src={image}
                    alt={caption}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s var(--ease-luxury)',
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLImageElement).style.transform = 'scale(1)')
                    }
                  />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          5. Care Instructions
      ================================ */}
      <section
        style={{
          background: 'var(--color-surface)',
          padding: 'clamp(60px, 8vw, 100px) var(--container-pad)',
          textAlign: 'center',
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}
          >
            Care
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 300,
              color: 'var(--color-text-primary)',
              fontStyle: 'italic',
            }}
          >
            Treat it well. It will last.
          </h2>
          <div
            style={{width: '40px', height: '1px', background: 'var(--color-border)'}}
          />
          {[
            'Hand wash in cold water with a gentle, pH-neutral detergent, or dry clean.',
            'Do not wring. Lay flat on a clean towel and roll gently to remove excess water.',
            'Hang to dry away from direct sunlight. Sunlight will dull silk over time.',
            'Press on reverse with a cool iron, or use a garment steamer.',
            'Store folded in a breathable cotton bag. Avoid plastic.',
          ].map((instruction, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              {instruction}
            </p>
          ))}
        </div>
      </section>

      {/* ================================
          6. You Might Also Like (placeholder)
      ================================ */}
      <section
        style={{
          background: 'var(--color-bg)',
          padding: 'clamp(80px, 10vw, 140px) var(--container-pad)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              marginBottom: '32px',
            }}
          >
            More styles coming soon.
          </p>
          <Button to="/">Back to Home</Button>
        </div>
      </section>
    </>
  );
}
