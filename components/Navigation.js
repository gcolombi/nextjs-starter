import Button from './Button';

export default function Navigation() {
    return (
        <header class="c-navigation">
            <div class="o-container">
                <nav class="c-navigation__row">
                    <Button
                        label="Home"
                        link="/"
                        className="c-btn"
                        wrapperClassName="c-navigation__btn"
                    />
                    <ul class="c-navigation__list u-margin--none">
                        <li class="c-navigation__list--item">
                        </li>
                        <li class="c-navigation__list--item">
                        </li>
                        <li class="c-navigation__list--item">
                        </li>
                        <li class="c-navigation__list--item">
                        </li>
                        <li class="c-navigation__list--item">
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}