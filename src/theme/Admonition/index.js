import React from 'react';
import Admonition from '@theme-original/Admonition';

/*
Overrides the default behavior of boxes.
Allows to omit icon and default text, if proper option is provided

How to use header options

:::info[no-header]
Just text in a colored box. No header bar, no icon, no title.
:::

:::warning[no-icon]
The icon is removed, but the header and color remain.
:::

:::tip[Important Tip | no-icon]
Custom title, but without the icon.
:::
*/

export default function AdmonitionWrapper(props) {
    // SWITCH 1: no-header
    // If [no-header] is used, render only a clean div with color
    if (props.title === 'no-header') {
        return (
            <div className={`alert alert--${props.type} margin-bottom--md`}>
                {props.children}
            </div>
        );
    }

    // SWITCH 2: no-icon
    // If [no-icon] is used, remove the icon but keep the default title
    if (props.title === 'no-icon') {
        return (
            // icon={null} hides the icon
            // title={null} tells Docusaurus to use the default label (Info, Warning...)
            <Admonition {...props} icon={null} title={null} />
        );
    }

    // SWITCH 3: Custom title without icon (advanced)
    // Example: :::info[My Title | no-icon]
    if (props.title && props.title.includes('| no-icon')) {
        const realTitle = props.title.replace('| no-icon', '').trim();
        return <Admonition {...props} title={realTitle} icon={null} />;
    }

    // Standard behavior for everything else
    return <Admonition {...props} />;
}