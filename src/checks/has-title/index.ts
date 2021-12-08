// src/checks/has-title/index.ts

import {
  Checkable, CheckResources, CheckParams,
  Result,
  IncomeCheck,
  Statuses
} from "@htmlacademy/checker";

const { SUCCESS, FAIL } = Statuses;

/** TODO: проверить что в index.html есть head > title */

class HasTitleCheck implements Checkable {
  constructor(private projectPath: string, private params: CheckParams) {}

  public async check(
    resources: CheckResources,
    { pattern = "index.html", ignorePattern = [] }: IncomeCheck
  ): Promise<Result> {
    const htmlAst = await resources.projectResources["html-ast"]({
      pattern,
      ignorePattern,
    });

    const jsdom = htmlAst.resource.data["index.html"].data;
    const { window: { document: doc } } = jsdom;

    const failed = doc.querySelector("head > title") === null;

    return {
      title: "Has title check",
      message: failed ? "Has no title" : "Has title",
      check: "has-title",
      status: failed ? FAIL : SUCCESS
    };
  }
}

export default HasTitleCheck;
