import {render, screen} from "@testing-library/react";

import Button, {BUTTON_TYPE_CLASSES} from "./button.component";

describe("Button Tests", () => {
    test("Should render base button when nothing is passed", () => {
        render(<Button>Test</Button>);
        expect(screen.getByRole("button")).toHaveStyle("background-color: black");
        expect(screen.getByRole("button")).not.toBeDisabled();
    });
    
    test("Should be disabled when isLoading is true", () => {
        render(<Button isLoading={true}>Test Button</Button>);

        expect(screen.getByRole("button")).toBeDisabled();
    });

    test("Should render Google button when passed Google Class Type", () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test Button</Button>);

        expect(screen.getByRole("button")).toHaveStyle("background-color: #4285f4");
    });

    test("Should render Inverted button when passed Inverted Class Type", () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test Inverted Button</Button>);

        expect(screen.getByRole("button")).toHaveStyle("background-color: white");
    })
})