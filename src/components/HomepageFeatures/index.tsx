import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/*type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};*/

type FeatureItem = {
    title:          string;
    imgPath:        string;
    description:    ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to understand',
    //Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    imgPath: 'img/fapi-feature1.png',
    description: (
      <>
          Football API empowers you to build flexible queries using standardized objects. With familiar football terminology, <strong>integration is seamless and intuitive</strong>.
      </>
    ),
  },
  {
    title: 'Backend-to-backend',
    //Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    imgPath: 'img/fapi-feature2.png',
    description: (
      <>
          The <strong>unified API output</strong> simplifies maintenance and maximizes reusability, leaving each frontend free to present the data its own way.
      </>
    ),
  },
  {
    title: 'Details matter',
    //Svg: require('@site/static/img/fapi_feature3.svg').default,
    imgPath: 'img/fapi-feature3.png',
    description: (
      <>
          Every shot, every touch, every save is described through a <strong>set of standardized attributes</strong> — allowing you
          to read the game like no one else.
      </>
    ),
  },
];

/*function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}*/
function Feature({title, imgPath, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img src={imgPath} alt={title} className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
